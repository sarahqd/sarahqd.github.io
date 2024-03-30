---
layout: post
title:  "Read cad geometry and assemblies with OCCT"
tags: CAD C++ OCCT
created: March 29, 2024
last_updated: March 29, 2024
---
Open CASCADE Technology (OCCT) is used to get data from geometry files(such as .stp or .iges files), in CAD/CAE applications. The retrieved geometry data could be converted to be VTK data, which is rendered afterwards in VTK render window.<!--more-->

## Read geometry files with neutral formats

OCCT has specific readers for stp and iges geometry files, `IGESControl_Reader` and `STEPControl_Reader`.  With those readers,  stp geometry files will be converted to `TopoDS_Shape`, an OCCT defined object.  In the converting progress, you can choose output one shape or a group of shapes when the geometry file is an assembly. Here let's look at the one shape transport.

```c++
STEPControl_Reader reader;
TopoDS_Shape shape;
IFSelect_ReturnStatus status = reader.ReadFile(file);
if (status != IFSelect_RetDone){
    ///Failed to read file
}else{
    IFSelect_PrintCount count = IFSelect_ListByItem;
    reader.PrintCheckLoad(Standard_False,count);
    reader.TransferRoots();
    //Import the geometry as a whole part
    shape = reader.OneShape();
}
```

When we get the shape object, then we could convert it to vtk data.

```c++
IVtkTools_ShapeDataSource* source = IVtkTools_ShapeDataSource::New();
source->SetShape(new IVtkOCC_Shape(shape));
```



## Analyze assembly of the geometry files

If the geometry file is an assembly, looks like this

```
---Assembly
-----Component 1
----------Part 1
----------Part 2
-----Component 2
----------Part 3
----------Part 4
```

We must convert the geometry data to `TDocStd_Document` first, then retrieve shapes from it with `XCAFDoc_ShapeTool`. At the same time,  `XCAFDoc_ShapeTool` also supports identification of the type of the shape, assembly or component or just a simple part without children,  e.g. `IsAssembly`,  `IsComponent`, `IsSimpleShape`.

```c++
STEPControl_Reader reader;
TopoDS_Shape shape;
IFSelect_ReturnStatus status = reader.ReadFile(file);
if (status != IFSelect_RetDone){
    ///Failed to read file
}
//Initialize doc
Handle(TDocStd_Document) doc;
Handle(XCAFApp_Application) anApp = XCAFApp_Application::GetApplication();
anApp->NewDocument("MDTV-XCAF", doc);
if(!reader.Transfer(doc)){
    ///Failed to initialize doc
}
//Initialize assembly
Handle(XCAFDoc_ShapeTool) assembly = XCAFDoc_DocumentTool::ShapeTool(doc->Main());
TDF_LabelSequence labels;
assembly->GetShapes(labels);
TDF_Label label;
TDataStd_Name::GetID();

if(labels.Length() <= 1){
    /// The geometry itself is a simple shape
}

for (int i = 1; i <= labels.Length(); i++) {
    label = labels.Value(i);
    Handle(TDataStd_Name) nameAttr;
    if (label.FindAttribute(TDataStd_Name::GetID(), nameAttr)) {
        // Convert the retrieved name to QString for use in Qt
        TCollection_ExtendedString name = nameAttr->Get();

        if(i == 1) {
            ///It's the top level of the assembly
        }

        TopoDS_Shape shape = assembly->GetShape(label);

        if(assembly->IsSimpleShape(label)){
            //save the shape as a part
        }
        else if(assembly->IsComponent(label)){
            //save the shape as a component
        }
    }
}
```



## Reference

[Opencascade website](https://dev.opencascade.org/)