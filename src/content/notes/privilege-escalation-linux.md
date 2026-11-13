---
title: "Linux Privilege Escalation Essentials"
description: "Quick enumeration cheat sheet for Linux environments."
publishDate: "2024-05-12"
category: "Linux"
tags: ["PrivEsc", "SUID", "Sudo", "Linux"]
---

# Linux Privilege Escalation: Basic Enumeration

## Sudo Privileges

Check commands that can be run as superuser without password:

```bash
sudo -l
```

## SUID Binaries

Locate binaries with SUID permission bit set across the filesystem:

```bash
find / -perm -4000 -type f -exec ls -la {} 2>/dev/null \;
```

## Capabilities

Inspect filesystem capabilities assigned to binaries:

```bash
getcap -r / 2>/dev/null
```

## Scheduled Tasks (Cron)

Review system and user cron tables:

```bash
cat /etc/crontab
ls -la /etc/cron.*
```
