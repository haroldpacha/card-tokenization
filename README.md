# Tokenización de Tarjetas

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Linkedin](https://img.shields.io/badge/linkedin-Harold%20Pacha-blue)](https://discord.gg/TFEZ7j4MZd)

Prueba Técnica - Backend Developer

## Cómo utilizar
Esta guía describe los pasos a seguir para poder ejecutar el proyecto en un entorno local.

Cree un archivo `.env` con la siguiente información y reemplace por sus credenciales de AWS: 

```bash
AWS_ACCESS_KEY_ID=reemplazar-aqui
AWS_SECRET_ACCESS_KEY=reemplazar-aqui

EVENT_BUS=cardtokenization
```
Luego ejecute los siguientes comandos para levantar el proyecto en local y le mostrará los end-points creados.


```bash
$ npm install
$ npm run dev
```

### Test locales

Si desea ejecutar las pruebas en local ejecute el siguiente comando.
```bash
$ npm run test
```

### Deployar en AWS

Si desea deployar el proyecto en la nube ejecute el siguiente comando y le mostrará los end-points creados.

```bash
$ npm run deploy
```


## Informe de problemas
> El Token de seguridad para los end-points es: `pk_test_LsRBKejzCOEEWOsw`

> Este proyecto se ha probando en local y en la nube de AWS funcionando correctamente. Si encontró un error o si tiene una solicitud de función, infórmelo enviando un correo electronico por favor.

Este proyecto ha sido ejecutado con las siguientes versiones:

| Programa  | Version |
| ------------- |:-------------:|
| NodeJS      | v18.x     |
| Npm      | 9.6.7     |
## Autor

[Harold Pacha](mailto:haroldpacha.rm@gmail.com)

## Licencia

Este proyecto está bajo la licencia MIT.