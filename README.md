# Configuración ESLint, Prettier y Husky

Este es un repositorio base usando la versión 14 de Angular, tengan en cuenta que las librerías que usemos pueden cambiar su implementación en el tiempo, asi que deben de adaptar el proyecto de acuerdo a esos cambios.

## Extensiones VSCode y Tips

Agregaremos las extensiones de ESLint y Prettier, luego iran a la configuración del vscode y pegaran lo siguiente (miren el video para que vean como lo hago):

```json
"editor.formatOnSave": true,
  "prettier.requireConfig": true,
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "prettier.printWidth": 120
```

## Migracion TSLint a ESLint Angular < v12

Recuerda que estos pasos solo aplica a las versiones que estan antes de la versión 12, ya que esas versiones usaban TSLint y generaban un archivo llamado **_tslint.json_**.

Ejecuta el siguiente comando en tu consola

```
ng add @angular-eslint/schematics
ng g @angular-eslint/schematics:convert-tslint-to-eslint --remove-tslint-if-no-more-tslint-targets --ignore-existing-tslint-config
```

Cuando termine de ejecutar esos comandos ya puedes eliminar el archivo **_tslint.json_**.

## Instalación EsLint Angular >= v12

Esta configuración solo aplica si usas angular versión 12 o superior.

```
ng add @angular-eslint/schematics
```

más información en: https://github.com/angular-eslint/angular-eslint

## Code Quality

1. Prettier
2. eslint-config-prettier
3. eslint-plugin-prettier

Ejecuta el siguiente comando en tu consola

```
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
```

Luego dentro de tu archivo .eslinttrc.json agrega lo siguiente en la sección **extends** de las configuraciones para los archivos **.ts**
Configuración para los archivos TS:

```json
    		"extends": [
			    "plugin:@angular-eslint/recommended",
                "plugin:@angular-eslint/template/process-inline-templates",
                "plugin:prettier/recommended"
			]
```

Ahi mismo agregaremos unas reglas de exclusión en la sección de **rules**:

```json
		"rules": {
				"@angular-eslint/directive-selector": [
					"error",
					{
						"type": "attribute",
						"prefix": "app",
						"style": "camelCase"
					}
				],
				"@angular-eslint/component-selector": [
					"error",
					{
						"type": "element",
						"prefix": "app",
						"style": "kebab-case"
					}
				],
				"@typescript-eslint/unbound-method": [
					"error",
					{
						"ignoreStatic": true
					}
				],
				"@typescript-eslint/explicit-function-return-type": ["error"],
				"@typescript-eslint/no-useless-constructor": ["error"]
			}
```

Puedes encontrar todas las reglas para TypeScript en este link: https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules

Configuración para los archivos HTML:

```json
	"extends": [
		  "plugin:@angular-eslint/template/recommended",
          "plugin:prettier/recommended"
			],
```

Si vas usar archivos **_.spec_** debes de ignorarlos ya que los archivos de test sirven para realizar simulaciones y el codigo que escribamos puede que no cumpla con las especificaciones de ESLint, para ignorarlos debes de agregar en la sección **ignorePatterns** lo siguiente:

```json
	"ignorePatterns": ["projects/**/*", "src/app/**/*.spec.ts"],
```

**LISTADO DE REGLAS PARA TYPESCRIPT EN: https://github.com/typescript-eslint/typescript-eslint**

## Configurar archivos Prettier

Debes de crear los siguientes archivos en la raíz de tu proyecto:

1. .prettierrc
2. .prettierignore

dentro del archivo **.prettierrc** coloca lo siguiente:

```json
{
  "arrowParens": "always",
  "bracketSpacing": true,
  "insertPragma": false,
  "printWidth": 120,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "useTabs": true,
  "endOfLine": "auto"
}
```

Para evitar formatear algunos archivos podemos hacer uso del archivo **.prettierignore**, agrega lo siguiente:

```console
node_modules/*
package-lock.json
yarn.lock
src/*.ts
src/index.html
```

Recuerda que puedes configurar los atributos a tu gusto, más información en https://prettier.io/playground/

Dentro tu archivo **package.json** existe una sección llamada **scripts**, dentro agregaras lo siguiente:

```json
"format": "prettier --write \"./src/**/*.{ts,json,html}\"",
```

## Configurar Husky

Husky nos ayudara a verificar nuestros cambios de git, más información en:
https://typicode.github.io/husky/#/

Ejecuta el siguiente comando:

```console
npx husky-init && npm install
```

Esto creara una carpeta llamada **".husky"**, dentro de esta carpeta existe un archivo llamado **pre-commit**, dentro agregaras lo siguiente:

```console
npm run format &&  ng lint --fix  && git add .
```

## Formatear solo los archivos modificados

Para poder formater unicamente los archivos modificados usaremos la librería **pretty-quick**

```console
npm i -D pretty-quick
```

Ahora debemos de modificar nuestro archivo **pre-commit** con lo siguiente:

```console
npx pretty-quick --pattern "src/**/*.*(ts|json|html|scss)" --staged  && ng lint --fix
```

## Tips 🤓

Opcionalmente puedes poner los comandos del archivo **pre-commit** dentro de la sección de **scripts** de tu **package.json**, pero recuerda que en esa sección deberías poner scripts que te ayuden mientras vas codificando o que no necesiten algun estado de git (push, add, commit, etc).

Teniendo en cuenta eso, podriamos quedarnos con los siguientes scripts.

```json
		"format": "prettier --write \"./src/**/*.{ts,json,html}\"",
		"lint-format": "npm run format &&  ng lint --fix",
		"format-pretty-quick": "pretty-quick --pattern \"src/**/*.*(ts|json|html|scss)\" --staged",
```

Pueden escribirme si tiene dudas chikis, gracias por su apoyo.🤗

Suscríbete a mi canal 😎
https://www.youtube.com/c/LogiDev

**Sígueme en mis redes:**
👉Facebook : https://facebook.com/LogiDev25  
búscame como: @LogiDev25  
👉Instagram: https://instagram.com/jimyhdolores/  
búscame como: @jimyhdolores  
👉Twitter: https://twitter.com/jimyHDolores  
búscame como: @jimyHDolores  
👉LinkedIn:https://linkedin.com/in/jimyhuachodolores/
