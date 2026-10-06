# Extensiones

Las extensiones son módulos de código funcionales que se instalan desde fuera del editor MakeCode y agregan nuevos bloques en la **Caja de Herramientas**. Estos bloques son creados por otros autores u organizaciones para hacer cosas que van desde simplificar tareas de codificación hasta trabajar con dispositivos de hardware.

### ~ reminder

#### Las extensiones eran conocidas como "Paquetes"

Las **Extensiones** anteriormente se llamaban **Paquetes** en MakeCode.

### ~

## Añadiendo una extensión a un proyecto

Puedes agregar una extensión yendo a la **Caja de Herramientas** y pulsando en la categoría **Extensiones**.

![Categoría Extensiones Caja de herramientas](https://cdn.makecode.com/blob/b9141393e7447821ffecf7add680ad612441d57f/static/extensions/toolbox-category.png)

Esto abrirá una ventana que te permitirá buscar extensiones. Además, se muestra una selección de extensiones recomendadas para que elijas.

![Ventana Extensiones](https://cdn.makecode.com/blob/e625fb46edf074d757c105221da652388c6de858/static/extensions/extensions-window.gif)

Cuando selecciones una extensión, podrás ver la nueva categoría "Extensión" en la Caja de Herramientas de tu proyecto.

![Nueva extensión añadida en la Caja de Herramientas](https://cdn.makecode.com/blob/e4b54d14ba792e449865b607192dd079ad9afd25/static/extensions/new-extension.png)

La categoría de la Caja de Herramientas contendrá los bloques de la extensión, listos para que los uses en el código de tu proyecto.

![Bloques en la extensión añadida](https://cdn.makecode.com/blob/c7fedaaf71a7abe78c7734f07e5f27de2c440db3/static/extensions/extension-blocks.png)

### ~ hint

#### Galería de extensiones

Para consultar la lista de extensiones por categorías, navega por la página [Galería de Extensiones](/extensions/extension-gallery).

### ~

## Eliminando una extensión de un proyecto

Para eliminar una extensión de un proyecto, pulsa en el botón de cambio de Lenguaje para pasar el proyecto a la vista de **JavaScript** o **Python**. Luego, expande la vista del **Explorador** debajo del simulador de Calliope mini. Pulsa el botón **Borrar** junto a la extensión que deseas eliminar.

![Explorador de Archivos](https://cdn.makecode.com/blob/3b392322017eeef0375453eecfa925139eebae3c/static/extensions/file-explorer.png)

## ¿Qué extensiones están cargadas en mi proyecto?

Para determinar qué extensiones está utilizando tu proyecto actualmente, simplemente puedes abrir el proyecto en MakeCode y mirar la Caja de Herramientas para ver las categorías personalizadas que se muestran. Si necesitas más información, como la ruta del repositorio o la versión de la extensión, abre el proyecto en MakeCode y selecciona **Configuración del Proyecto** en el menú **Configuración** en la esquina superior derecha de la pantalla.

![Menú de configuración](https://cdn.makecode.com/blob/1d9cdbaae0c681ce55f18bd0eca2a7342cb033a4/static/extensions/settings-menu.png)

Selecciona el botón **Editar configuraciones como texto**.

![Botón Editar configuraciónes](https://cdn.makecode.com/blob/fe59f3d86832bf016e4337adc996b94f3eff505d/static/extensions/edit-settings-button.png)

La configuración del proyecto aparecerá como texto y podrás ver las extensiones utilizadas en tu proyecto. Están listadas debajo de `"dependencias"`:

```
"dependencies": {
    "core": "*",
    "radio": "*",
    "microphone": "*",
    "maqueen": "github.com:dfrobot/pxt-maqueen#v1.7.2"
},
```

Las extensiones con solo una ruta de `"*"` son aquellas incluidas por defecto con el editor. Otras son externas y tienen una ruta de repositorio, posiblemente con una versión especificada.

## Extensiones personalizadas

El manual [Construye tu propia extensión](https://makecode.com/extensions/getting-started) está disponible para usuarios avanzados que deseen publicar su propia extensión. 