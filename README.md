# SafeBox

SafeBox es un **gestor de contraseñas local**, diseñado para ser seguro y fácil de usar, con una interfaz gráfica sencilla. Ideal para áreas de trabajo donde no se requiere tener contraseñas en la nube. Su principal ventaja es ser **offline** y permitir el almacenamiento local de contraseñas de manera segura, sin depender de servicios externos.

![Preview de SafeBox](/assets/screenshot/preview.png)

---

## Tabla de Contenidos

1. [Descripción](#descripción)
2. [Características](#características)
3. [Tecnologías](#tecnologías)
4. [Instalación](#instalación)
5. [Uso](#uso)
6. [Licencia](#licencia)

---

## Descripción

SafeBox es un **gestor de contraseñas local** que ofrece una forma **segura y sencilla** de almacenar contraseñas sin necesidad de conexión a la nube. Es perfecto para entornos donde se requiere alta seguridad y control de las contraseñas, evitando el riesgo de almacenamiento en servidores externos. Además, su **interfaz amigable** permite al usuario gestionar sus contraseñas de forma intuitiva y eficiente.

---

## Características

- **Encriptación de contraseñas**: Las contraseñas se cifran usando AES-256-CBC antes de ser almacenadas en la base de datos.
- **Almacenamiento local**: Las contraseñas se guardan localmente, sin necesidad de servidores externos.
- **Interfaz amigable**: La aplicación tiene una interfaz sencilla y fácil de usar.
- **Generador de contraseñas aleatorias**: Crea contraseñas seguras automáticamente.
- **Temas**: El tema de la aplicación se adapta al SO.

---

## Tecnologías

- **Framework**: Electron
- **Librería**: React con Vite
- **Base de datos**: SQLite
- **Cifrado**: AES-256-CBC usando la librería `crypto`
- **Método de encriptación**: La clave secreta se **hashea** usando SHA-256 para mayor seguridad.

---

## Instalación

### Instalación predeterminada

Para instalar SafeBox con la **clave secreta predeterminada** sigue estos pasos:

1. Ve al apartado [Realeases](https://github.com/adriantaf/safe-box/releases) en este repositorio
2. Dirigete a la ultima versión y en el apartado **Assets** descarga el instalador adecuado para tu SO
3. Instalacion:
   - En Linux: solo instala el archivo .deb o ejecuta el archivo .AppImage y listo!
   - En Windows: Debido a que la aplicación no está firmada se te mostrará una advertencia, para resolver esto solo presiona en _Mas información_ al final del texto y por ultimo presiona el botón _Ejecutar de todos modos_ y listo!

### Compilación con una nueva clave secreta

Si prefieres compilar la aplicación con una **clave secreta personalizada**, sigue estos pasos:

1. Asegúrate de tener **Node.js** y **npm** instalados.
2. Clonar el repositorio:
   ```bash
   git clone https://github.com/adriantaf/safe-box.git
   cd safe-box
   ```
3. Instalar las dependencias:
   ```bash
   npm install
   ```
4. Recompila las dependencias nativas:
   Especialmente util para _better-sqlite3_
   ```bash
   npx electron rebuild
   ```
5. Asigna tu propia **clave secreta**, edita el archivo `electron\crypt\secret_key.cjs`
   ```js
   const SECRET_KEY = "tu_clave_secreta";
   ```
   **Muy importante:** Guarda los cambios
6. Construye la aplicación:
   ```bash
   npm run build
   # si deseas probar la aplicación ejecuta:
   npm run start
   ```
7. Genera el instalador
   ```bash
   npm run dist
   ```
8. Ejecuta el instalador:
   - Ve a `dist-electron/`
   - Busca el archivo SafeBox Setup x.x.x.[exe/deb/AppImage] dependiendo del SO
     Ahora disfruta de _SafeBox_

---

## Uso

Una vez instalada la aplicación, simplemente busca SafeBox en tu computadora y comienza a agregar, gestionar y almacenar tus contraseñas de manera segura.

---

## Licencia

Este proyecto está bajo la licencia [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/), lo que significa que puedes compartir y adaptar el proyecto, pero no para fines comerciales. 🗿
