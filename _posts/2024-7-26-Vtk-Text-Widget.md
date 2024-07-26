---
layout: post
title:  "Implement a title with CJK characters on a VTK widget"
tags: VTK
created: July 26, 2024
last_updated: July 26, 2024
---

Sometimes a 2D text widget is in need like the title of a VTK widget.  So What requirements do we have?<!--more-->

> Q: Does the text widget have a fixed relative position to the VTK widget?
>
> A:  Yes.
>
> Q: Does the content of the text widget change dynamically?
>
> A: Yes.
>
> Q: Is the text widget selectable or draggable?
>
> A: No.
>
> Q: What's the position and the size of the text widget?
>
> A: It lays on the middle top of the VTK widget and it has 10% of the VTK widget's size.
>
> Q: What kind of characters do we need to support?
>
> A: English characters and CJK characters

## VTK support for special characters

VTK does support English characters, and it has fonts like `Courier`, `Arial`, and `Times`. What if we want to support other characters, e.g., CJK characters?  Right,  we could use`VTK_FONT_FILE`, which means users must provide a specific font file.  If code runs on the Windows platform, Microsoft Yahei is a good choice. It has a full package of characters, and you don't need to worry about the lack of some characters.  

```c++
vtkSmartPointer<vtkTextActor> textActor = vtkSmartPointer<vtkTextActor>::New();
textActor->GetTextProperty()->SetFontFamily(VTK_FONT_FILE);
textActor->GetTextProperty()->SetFontFile("C:/Windows/Fonts/msyh.ttc");
```

## VTK 2D Widget: Fixed or dynamic

First, I thought about `vtkTextWidget` to implement the function. And the code looks like that. (AI helps a lot.)

```c++
//Initialize necessary components for a VTKWidget
vtkNew<vtkRenderer> renderer;
vtkNew<vtkRenderWindow> renderWindow;
renderWindow->AddRenderer(renderer);
vtkNew<vtkRenderWindowInteractor> renderWindowInteractor;
renderWindow->SetInteractor(renderWindowInteractor);
//Create a vtkTextActor
vtkSmartPointer<vtkTextActor> textActor = vtkSmartPointer<vtkTextActor>::New();
textActor->GetTextProperty()->SetFontFamily(VTK_FONT_FILE);
textActor->GetTextProperty()->SetFontFile("C:/Windows/Fonts/msyh.ttc");
textActor->SetInput("Hello, world!"); //the characters can be changed to CJK characters
//Create a vtkTextRepresentation
vtkSmartPointer<vtkTextRepresentation> textRepresentation = vtkSmartPointer<vtkTextRepresentation>::New();
textRepresentation->GetPositionCoordinate()->SetCoordinateSystemToNormalizedViewport();
textRepresentation->GetPositionCoordinate()->SetValue(0.5, 0.9); // on the middle top
textRepresentation->GetPosition2Coordinate()->SetCoordinateSystemToNormalizedViewport();
textRepresentation->GetPosition2Coordinate()->SetValue(0.1, 0.1);
textRepresentation->SetShowBorderToOff(); //The widget has no frame border
//Create a vtkTextWidget and start it
vtkSmartPointer<vtkTextWidget> textWidget = vtkSmartPointer<vtkTextWidget>::New();
textWidget->SetRepresentation(textRepresentation);
textWidget->SetInteractor(renderWindowInteractor);
textWidget->SetTextActor(textActor);
textWidget->SelectableOff();
textWidget->On();
//Render
renderWindowInteractor->Start();
renderWindow->Render();
```

It works well. However, it has a fatal con. The `vtkTextWidget` can't change its content dynamically since the `renderWindowInteractor->Start()` . That means,  its `On()` function must be triggered in the front of the start function mentioned before, and its content is immutable once `On()` function is triggered. That doesn't fit into our requirement.

So how about using the `vtkTextActor` directly?

```c++
//Initialize necessary components for a VTKWidget and start interactor
...
//Create a vtkTextActor
vtkSmartPointer<vtkTextActor> textActor = vtkSmartPointer<vtkTextActor>::New();
textActor->SetInput("Hello, world!");
//configure the vtkTextActor's position
textActor->GetTextProperty()->SetFontSize(12);
textActor->GetPositionCoordinate()->SetCoordinateSystemToNormalizedViewport();
textActor->GetPositionCoordinate()->SetValue(0.5, 0.9); // on the middle top
textActor->GetPosition2Coordinate()->SetCoordinateSystemToNormalizedViewport();
textActor->GetPosition2Coordinate()->SetValue(0.1, 0.1);
renderer->AddActor2D(textActor);
renderWindow->Render();
```

That looks better. The text represents on the middle top of the VTK widget no matter how the VTK widget zooms in and out. But there is another problem, the `textActor` doesn't scale along with the VTK widget resizing. Even though it has a function `SetTextScaleModeToViewport()` , but it zooms out but doesn't zooms in back. In consideration with the requirement,  it's ok to keep a fixed size.



## Reference

[VTK doc](https://docs.vtk.org/)

[VTK pipeline and an example](https://sarahqd.github.io/2024/04/29/Pipeline-of-rendering-and-VTK-example.html)