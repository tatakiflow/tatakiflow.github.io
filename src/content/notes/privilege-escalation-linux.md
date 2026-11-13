---
title: "Comandos clave para escalada de privilegios en Linux"
description: "Cheat-sheet de enumeración rápida en entornos Linux."
publishDate: "2024-05-12"
category: "Linux"
tags: ["Privesc", "SUID", "Sudo", "Linux"]
---

# Escalada de Privilegios en Linux: Enumeración Básica

## Privilegios Sudo

Verificar comandos ejecutables como superusuario sin contraseña:

```bash
sudo -l
```

## Binarios SUID

Localizar binarios con bit SUID establecido en el sistema de archivos:

```bash
find / -perm -4000 -type f -exec ls -la {} 2>/dev/null \;
```

## Capacidades (Capabilities)

Inspeccionar capacidades asignadas a binarios:

```bash
getcap -r / 2>/dev/null
```

## Tareas programadas (Cron)

Revisar crontabs del sistema y de usuarios:

```bash
cat /etc/crontab
ls -la /etc/cron.*
```
