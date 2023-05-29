# SF2000
The SF2000 is a cheap hand-held emulation gaming console which was released in early 2023. Although the device itself is sold by a variety of vendors, it was the vendor "Data Frog" who caught public attention, and so the device is often simply referred to as "the Data Frog".

For a cheap device, it's actually fairly capable - most Game Boy, Game Boy Color, NES and Genesis/Mega Drive games play at full speed, and many arcade, Game Boy Advance and SNES titles do as well. The device has an IPS panel (not OCA laminated), and a user-replaceable "18650" battery, which can be charged via a USB-C port on the device. It also has analog A/V out (note: not HDMI), meaning it can be connected to a CRT TV - the type of display most arcade, Genesis/Mega Drive and SNES games were originally intended to be displayed on. It has a built-in 2.4GHz antenna, and can receive input from a compatible wireless controller (usually sold separately).

Some downsides to the device: it's mono only, there's no headphone jack (although there is a volume wheel), screen brightness cannot be altered (it's fairly bright), SNES and Game Boy Advance are hit-or-miss in terms of performance (some games are fine, many games run slowly), the stock firmware is closed-source so the device's performance may never get any better than as-shipped, and some folks have had issues with the buttons (they're quite cheap, and sit flush when pressed).

So is the "Data Frog" any good? Only you can answer that question for yourself. There are certainly more powerful devices out there, more fully featured devices, devices with better hardware, etc. - but almost all of those devices cost a lot more than the SF2000. At the end of the day, you have to look at the features offered at the given price-point, and only then can you decide if you're interested in the device or not.

---

## Table of Contents
- [SF2000](#sf2000)
  - [Table of Contents](#table-of-contents)
  - [Hardware](#hardware)
    - [CPU](#cpu)
    - [Display](#display)
    - [Buttons](#buttons)
    - [D-Pad](#d-pad)
    - [Thumb Stick](#thumb-stick)
    - [Battery](#battery)
    - [Wireless Connectivity](#wireless-connectivity)
    - [A/V Output](#av-output)
  - [Emulators](#emulators)
    - [Arcade](#arcade)
    - [NES](#nes)
    - [SNES](#snes)
    - [Genesis/Mega Drive](#genesismega-drive)
    - [Game Boy](#game-boy)
    - [Game Boy Color](#game-boy-color)
    - [Game Boy Advance](#game-boy-advance)
  - [Firmware/BIOS (bisrv.asd)](#firmwarebios-bisrvasd)
    - [Button Mappings/Key Bindings](#button-mappingskey-bindings)
    - [Boot Logo](#boot-logo)
  - [Resources](#resources)
    - [Fonts](#fonts)
    - [Images (Used)](#images-used)
    - [Images (Unused)](#images-unused)
    - [Other Files](#other-files)
      - [Foldername.ini](#foldernameini)
    - [ROM Lists](#rom-lists)
    - [Sounds](#sounds)
    - [Unknown Files](#unknown-files)
  - [Tools and Links](#tools-and-links)
  - [Version History](#version-history)

---

## Hardware

### CPU
Although the main CPU of the SF2000 has literally had it's markings milled off by a routing tool, the community has determined that it's a HCSEMI B210, a single-core MIPS processor running at 810 MHz. It appears to be a clone of an ALi Tech chip. No SDK is currently available for it, and the device is closed-source.

### Display
The SF2000 features a `240x320` IPS display panel (not OCA laminated), which has been rotated 90&deg; clockwise to give a `320x240` display. It demonstrates screen tearing for all emulators, running from the right of the console to the left due to the panel rotation.

### Buttons
The ABXY are basically a clone of the original SNES controller buttons. Although everyone seems to be getting two purple and two lilac coloured buttons, there's a disparity to the _type_ of buttons folks are getting - some get two convex and two concave buttons, others have gotten three concave and one convex, etc..

Both the buttons and the underlying membrane from an original SNES controller can be swapped into the SF2000, which may improve the "feel" of the buttons. Note that the SF2000 uses ABXY buttons that have two plastic tabs sticking out to keep them in the shell (at 180 degrees from each other); some after-market SNES-style buttons have _three_ tabs, and won't fit the housing.

Some folks have modded the stock ABXY buttons on their SF2000s by adding a thin strip of tape or other thin material into the circular depression under each button - this causes the buttons to be raised a bit higher out of the shell, and to not sink as far into the shell when the button is pressed.

### D-Pad
Just like the ABXY buttons, the d-pad is a clone of the SNES d-pad. An original SNES d-pad and membrane can be swapped into the SF2000 as well.

### Thumb Stick
The SF2000 uses a Switch-style thumb stick that does _not_ depress for L2/R2. It is compatible with Switch thumb stick third-party covers.

### Battery
The SF2000 takes a 18650 type rechargeable battery, which is easily user replaceable (it's behind a battery door with a screw), and comes with a 1,500mAh one which runs for about 4 hours. 18650 batteries with and without "nubs" both fit fine. The console has built-in over-charge protection, but _does not have under-charge protection, so for safety do not leave the console turned on when the battery is low_. From when it displays a full-screen low battery indicator, it takes about 3.5 hours to charge the stock battery. The green charging light does _not_ turn off when fully charged.

Also note that while you can technically charge the SF2000 while it is powered on, doing so using a charger that supports fast charging or power delivery has a high chance of blowing the charging module IC and killing the device (multiple community reports). For safest charging, use a charger that only supports a maximum output of 5v.

### Wireless Connectivity
The SF2000 does not feature wifi or Bluetooth, but it _does_ have a 2.4Ghz antenna to support local wireless multiplayer using a compatible 2.4Ghz wireless controller for Player 2. The Y2 SFC wireless controller and the SF900 wireless controller have both been reported to work fine.

### A/V Output
The SF2000 features a mini-jack for analogue composite A/V output. The device is capable of output a user-selectable PAL or NTSC video signal. Only the _left_ audio channel is output - the device does _not_ down-mix to mono, which results in missing audio channels in games that expect to output stereo sound.

There's some limited evidence to suggest the A/V output is at 576i. When outputting a PAL signal, while the signal is indeed 50Hz, it seems like the emulators are still targeting 60Hz output - PAL scrolling is "jerky". Switching the device to output NTSC, scrolling becomes smooth. This holds true regardless of using a PAL or NTSC version of a ROM. Depending on your external display, video output over A/V may be somewhat heavily cropped on all screen edges - if so, this can result in UI elements at screen edges in games (health bars, remaining credits, etc.) being out-of-frame. Switching between PAL and NTSC doesn't alter the visible screen area. I've tested with a modern flat-panel Panasonic TV (cropped), a 1980s Commodore 1702 monitor (cropped), and with an el-cheapo USB 2.0 "EasyCap" video-capture USB stick (not cropped).

On my own unit, plugging in a charging cable while outputting over A/V introduces a lot of video noise in the A/V signal; so those planning to use the SF2000 as a TV console may need to do so while running on battery for the best experience.

---

## Emulators

The device advertises support for arcade, NES, SNES, Genesis/Mega Drive, Game Boy, Game Boy Color and Game Boy Advance; it also supports loading Master System ROMs. SNES and GBA performance are very hit-or miss (more miss than hit, really); the other consoles actually perform fairly well. All consoles currently stretch their output to fill the display, and do not maintain aspect ratio.

The SF2000 appears to be using Libretro with a custom front-end (i.e., not RetroArch).

### Arcade
The device is running Final Burn Alpha v0.2.97.42 (Git commit [`621e371`](https://github.com/Aftnet/fbalpha/commit/621e371)). Thanks to some truly exceptional work by `adcockm#8175` from the Retro Handhelds Discord, we know it supports an unusual mix of ROM sets, largely based on MAME 0.106 and Final Burn Alpha v0.2.97.42. `adcockm#8175` has gone ahead and compiled two separate [Clrmamepro](https://mamedev.emulab.it/clrmamepro/) dat files - [one for _all_ sets technically supported by the SF2000's current BIOS](/arcade/DataFrog_SF2000_FBA_v0.2.97.42.dat) (as of May 2023; though note that "supported" does not mean working or playable), and [one for all playable sets](/arcade/DataFrog_SF2000_FBA_v0.2.97.42_playable_no_dups.dat) with duplicates removed (and note, "playable" may include games with missing sound, graphical glitches, performance issues, but are otherwise technically functional). If you want to build a working set (must be non-merged) from the dat files, `adcockm#8175` has further provided [a list of "hints"](/arcade/Building_the_DataFrog_SF2000_FBA_v0.2.97.42_set.txt) as the sets you'll need to track down - for obvious reasons neither I nor anyone else can provide links to such material, but hopefully the hints will get you something you can start searching for. Finally, there's also [a HTML document](/arcade/DataFrog_SF2000_FBA.html) with a list of all of the supported sets along with some useful metadata, such as the set's full name, playability information, screen orientation, etc.. The `inrom` column indicates if the ROM was included on the SF2000's stock microSD card; it's interesting to note that there were more ROMs located on the card than were defined in the `mswb7.tax` file (and thus available from the arcade game list); none of the unlisted games were actually playable on the SF2000, so it's possible someone from Data Frog actually tested the games to an extent, and removed ones from the available list that were broken.

`adcockm#8175` also provided the following interesting statistics:

- Number of arcade ROMs known by the SF2000's firmware: `1431`
- Number properly rotated: `1291`
- Number with vertical orientation: `134`
- Number with screen upside-down: `6`
- Number "playable" (maybe no sound, some slowness, minor graphics issues): `949`
- Number unplayably broken but technically running: `175`
- Number fully broken (load hang/crash, etc.): `307`
- Number of playable unique games (dupes filtered out) in proper rotation: `354`
- Number of playable unique games (dupes filtered out) with rotated display: `61`
- Number of different versions of Street Fighter 2: `60+` 😵‍💫 [Von Millhausen: I think this stat is only half a joke!]
- Playable set total size: `3.10 GB` (3,336,344,502 bytes)
- Full set total size: `11.4 GB` (12,245,306,389 bytes)

### NES
Emulator is FCEUmm (Git commit [`7cdfc7e`](https://github.com/libretro/libretro-fceumm/commit/7cdfc7e)). There are references in the firmware to different NES palettes, but there's no interface or configuration for the emulator itself to choose one. On the original firmware, the A and B buttons were swapped. See "[Button Mappings/Key Bindings](#button-mappingskey-bindings)" section below.

### SNES
Emulator is Snes9x 2005 v1.36 (Git commit [`b94a804`](https://github.com/libretro/snes9x2005/commit/b94a804)). With the April 20th version of the firmware, SNES games often appear to run very slowly _on first launch_; but if you exit the game and load it again, it usually starts performing _much_ better.

### Genesis/Mega Drive
Emulator is PicoDrive 1.91 (Git commit [`cbc93b6`](https://github.com/libretro/picodrive/commit/cbc93b6)). Works pretty well. This emulator is capable of loading Master System ROMs if placed in the user ROMs folder on the microSD card; Game Gear ROMs do not load. Some PAL-region games may run too fast; NTSC-region games seem to always run at the correct speed. On the original firmware, A was mapped to A, B was mapped to B, and RB was mapped to C for some reason. See "[Button Mappings/Key Bindings](#button-mappingskey-bindings)" section below.

### Game Boy
Emulator is TGB Dual v0.8.3 (Git commit [`9be31d3`](https://github.com/libretro/tgbdual-libretro/commit/9be31d3)). Uses a black and white colour palette, which currently cannot be changed. On the original firmware, the A and B buttons were swapped. See "[Button Mappings/Key Bindings](#button-mappingskey-bindings)" section below.

### Game Boy Color
Emulator is TGB Dual v0.8.3 (Git commit [`9be31d3`](https://github.com/libretro/tgbdual-libretro/commit/9be31d3)). On the original firmware, the A and B buttons were swapped. See "[Button Mappings/Key Bindings](#button-mappingskey-bindings)" section below.

### Game Boy Advance
Emulator is gpSP v0.91 (Git commit [`261b2db`](https://github.com/libretro/gpsp/commit/261b2db)). Performance is fairly poor. On the original firmware, A and B buttons are mapped correctly, but the GBA shoulder buttons are mapped to X and Y for some reason. See "[Button Mappings/Key Bindings](#button-mappingskey-bindings)" section below.

---

## Firmware/BIOS (bisrv.asd)
The firmware for the SF2000 is actually located on the microSD card, in a file called `bisrv.asd` located in the BIOS folder. This file is a monolithic binary blob, which contains the device's OS, the emulators, their settings... basically everything. Data Frog have issued some firmware updates for the device since launch; the updates have added new features (e.g., additional language support, favourites, history, etc.), but have also introduced bugs (e.g., some SNES games run very slowly until they are quit and launched again, etc.). Data Frog have published a YouTube video showing how to update the firmware on the device, which [you can find here](https://www.youtube.com/watch?v=j8dT2fdGfck); the video's description contains a link to where you can download the latest firmware.

Known firmware versions are currently (dates approximate):

| Date | Version | Notes |
| ---- | ------- | ----- |
| Mid-March | ? | The original firmware that shipped with the first batch of devices |
| April 20th | ? | The first official firmware update; fixed some button mappings for Genesis, added support for 15 new languages. Also partially broke SNES compatibility - many SNES games will run very slowly on first launch, but quitting and immediately re-launching the game will have it run at normal speed (normal for the SF2000, anyway) |
| May 15th | ? | Added a built-in UI for global button mapping (which is broken in several ways, mainly SNES and Genesis controls are swapped, and no support for setting Player 2 controls), added a History feature, added a Favourites feature |
| May 22nd | 1.5V | First firmware with an official version number. Fixed the SNES/Genesis swapped button mappings, and now sets Player 2 controls to be identical to Player 1 (no way to set independently). There's some evidence of undocumented emulation improvements; some GBA homebrew that was non-functional in previous firmwares now loads correctly, and some GBA titles see marginally improved performance |

There is not currently any custom firmware (CFW) for the device. The stock firmware is currently being investigated; here are some findings from it:

### Button Mappings/Key Bindings
`osaka#9664` discovered that the OS supports loading game-specific key bindings from `.kmp` files, stored in the `save` folder for each system and named after a game's ROM file (e.g., `/FC/save/Game Name.EXT.kmp`). They also discovered where in the `bisrv.asd` file the default mappings for each emulator are stored. Working with this information, `notv37#4200` worked out what bits related to what buttons for each emulator. Using both their findings, we now have a tool which can be used to update both the global button mappings for the emulators, as well as create per-ROM mappings - you can [find this tool here](https://vonmillhausen.github.io/sf2000/tools/buttonMappingChanger.htm).

Note that the game-specific key bindings function have been removed from the May 15th firmware onwards.

### Boot Logo
When the device is powered on, a "Welcome" image is displayed for a short time before the main menu appears. This image comes from inside `bisrv.asd`, (towards the end; exact offset varies between BIOS revisions). It's a `512x200` RGB565 Little Endian raw image file, and looks like this:

![Boot Logo](/images/bootlogo.png)

The image is _actually_ displayed at half-resolution on the internal display though, `256x100`, centred in the middle of the screen. The boot logo can be changed to an arbitrary `256x100` image using a web-based tool I wrote, which you can [find here](https://vonmillhausen.github.io/sf2000/tools/bootLogoChanger.htm).

---

## Resources
The Resources folder on the microSD card contains all of the resources used by the device's firmware to construct the user interface at runtime. The following tables list the files from various firmware versions (the numbered columns, in approximate `mm.dd` format) and what they are used for, grouped by broad categories. Resolution and format given are for the latest firmware version only; details may be different for older firmwares. The icons in the firmware columns have the following meanings:

- ✨: file is new to this firmware version
- ✅: file is unchanged this firmware version
- 🚩: file is changed this firmware version
- ❌: file is removed this firmware version

### Fonts
| Filename | 03.15 | 04.20 | 05.15 | 05.22 | Description |
| -------- | ----- | ----- | ----- | ----- | ----------- |
| `Arial_cn.ttf` |  | ✨ | ✅ | ✅ | The "Arial" typeface, containing Latin, Greek, Cyrillic, Chinese, and Japanese characters. Duplicate of `yahei_Arial.ttf`, the single font file from the original firmware version |
| `Arial_en.ttf` |  | ✨ | ✅ | ✅ | The "Arial" typeface, containing Latin, Greek, Cyrillic, Armenian, Hebrew and Arabic characters |
| `Arial_jp.ttf` |  | ✨ | ✅ | ✅ | The "Arial" typeface, containing Latin, Greek, Cyrillic, Chinese and Japanese characters |
| `Arial_kr.ttf` |  | ✨ | ✅ | ✅ | The "Arial" typeface, containing Latin, Greek, Cyrillic, Chinese, Japanese and Korean characters |
| `Tahoma.ttf` |  | ✨ | ✅ | ✅ | The "Tahoma" typeface, containing Latin, Greek, Cyrillic, Armenian, Hebrew, Arabic and Thai characters  |
| `yahei_Arial.ttf` | ✨ | ✅ | ✅ | ✅ | The "Arial" typeface, containing Latin, Greek, Cyrillic, Chinese, Japanese and Korean characters |

### Images (Used)
As far as I am aware, all of the below images are actively used by the `20230515` version of the firmware; happy to take any corrections if it turns out any of them are unused! Note that while the stock theme is based around a `640x480` resolution, the actual _display_ on the SF2000 is a `320x240` one. The OS on the device uses nearest-neighbour scaling for its images, giving the stock UI a somewhat aliased appearance. If you're planning to make your own theme for the SF2000, design it for `320x240`, and then double the resolution when exporting the final images to the device for a crisper look on the internal panel. I've written a generic image tool for the SF2000 - it lets you convert SF2000-formatted images to PNG files, and lets you convert PNG or JPEG images to SF2000 formats (which may be useful if you want to theme your device); you can [find this tool here](https://vonmillhausen.github.io/sf2000/tools/genericImageTool.htm).

| Filename | Resolution | Format | 03.15 | 04.20 | 05.15 | 05.22 | Description | View |
| -------- | ---------- | ------ | ----- | ----- | ----- | ----- | ----------- | ---- |
| `aepic.nec` | 1008x164 | BGRA |  | ✨ | 🚩 | ✅ | User settings screen icons and labels in Korean | [view](/images/aepic.nec.png) |
| `apisa.dlk` | 640x480 | RGB565 Little Endian | ✨ | ✅ | 🚩 | ✅ | Arcade game-list background | [view](/images/apisa.dlk.png) |
| `appvc.ikb` | 150x214 | BRGA | ✨ | ✅ | ✅ | ✅ | Game art placeholder | [view](/images/appvc.png) |
| `awusa.tax` | 1008x164 | BRGA |  | ✨ | 🚩 | ✅ | User settings screen icons and labels in Thai | [view](/images/awusa.tax.png) |
| `bisrv.nec` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | In-game menu (position 3) | [view](/images/bisrv.png) |
| `bttlve.kbp` | 60x144 | BGRA | ✨ | ✅ | ✅ | ✅ | Battery level indicator icons | [view](/images/bttlve.png) |
| `c1eac.pal` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | SNES game-list background | [view](/images/c1eac.png) |
| `cero.phl` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Game Boy Color game-list background | [view](/images/cero.png) |
| `certlm.msa` | 40x24 | BGRA | ✨ | ✅ | ✅ | ✅ | NES game-list indicator | [view](/images/certlm.png) |
| `cketp.bvs` | 640x816 | RGB565 Little Endian |  |  | ✨ | ✅ | The console selection images at the bottom of the new button mapping feature screen | [view](/images/cketp.bvs.png) |
| `d2d1.hgp` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | In-game menu (position 2) | [view](/images/d2d1.png) |
| `dism.cef` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | In-game menu (position 1) | [view](/images/dism.png) |
| `djctq.rsd` | 40x24 | BGRA | ✨ | ✅ | ✅ | ✅ | SNES game-list indicator | [view](/images/djctq.png) |
| `djoin.nec` | 1008x164 | BRGA |  | ✨ | 🚩 | ✅ | User settings screen icons and labels in Spanish | [view](/images/djoin.nec.png) |
| `dpskc.ctp` | 640x320 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | In-game menu save-state slots (positions 1, 2, 3 and 4) | [view](/images/dpskc.png) |
| `drivr.ers` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | SNES main menu background | [view](/images/drivr.png) |
| `dsuei.cpl` | 640x480 | RGB565 Little Endian | ✨ | ✅ | 🚩 | ✅ | User ROMs main menu background | [view](/images/dsuei.cpl.png) |
| `dxdiag.bin` | 40x24 | BGRA | ✨ | ✅ | ✅ | ✅ | Genesis/Mega Drive game-list indicator | [view](/images/dxdiag.png) |
| `dxkgi.ctp` | 1008x164 | BRGA | ✨ | ✅ | 🚩 | ✅ | User settings screen icons and labels in English | [view](/images/dxkgi.ctp.png) |
| `dxva2.nec` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Search keyboard (pressed) | [view](/images/dxva2.png) |
| `ectte.bke` | 161x126 | BRGA | ✨ | ✅ | ✅ | ✅ | Main menu icon selection box | [view](/images/ectte.png) |
| `efsui.stc` | 640x480 | RGB565 Little Endian | ✨ | ✅ | 🚩 | ✅ | Game Boy Advance game-list background | [view](/images/efsui.stc.png) |
| `esent.bvs` | 1008x164 | BRGA |  | ✨ | 🚩 | ✅ | User settings screen icons and labels in Turkish | [view](/images/esent.bvs.png) |
| `exaxz.hsp` | 152x1224 | BRGA | ✨ | 🚩 | ✅ | ✅ | Main menu "Games Exist" and "Start: Open" labels for all languages | [view](/images/exaxz.png) |
| `fixas.ctp` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | NES main menu background | [view](/images/fixas.png) |
| `fltmc.sta` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Game Boy game-list background | [view](/images/fltmc.png) |
| `fvecpl.ai` | 40x24 | BGRA | ✨ | ✅ | ✅ | ✅ | Game Boy game-list indicator | [view](/images/fvecpl.png) |
| `gakne.ctp` | 576x256 | BGRA |  |  | ✨ | ✅ | A new copy of the English menu labels image, identical to older versions of `dxkgi.ctp` (which was changed entirely in `05.15`) | [view](/images/gakne.ctp.png) |
| `gkavc.ers` | 576x256 | BGRA |  |  | ✨ | ✅ | A new copy of the Chinese menu labels image, identical to older versions of `itiss.ers` (which was changed entirely in `05.15`) | [view](/images/gkavc.ers.png) |
| `gpsvc.bvs` | 392x80 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | In-game menu save-state slot (position 3) | [view](/images/gpsvc.png) |
| `hctml.ers` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Arcade main menu background | [view](/images/hctml.png) |
| `hgcpl.cke` | 392x80 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | In-game menu save-state slot (position 2) | [view](/images/hgcpl.png) |
| `hlink.bvs` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Search keyboard (hover) | [view](/images/hlink.png) |
| `htui.kcc` | 40x24 | BGRA | ✨ | ✅ | ✅ | ✅ | Game Boy Color game-list indicator | [view](/images/htui.png) |
| `icm32.dll` | 40x24 | BGRA | ✨ | ✅ | ✅ | ✅ | Game Boy Advance game-list indicator | [view](/images/icm32.png) |
| `icuin.cpl` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Genesis/Mega Drive main menu background | [view](/images/icuin.png) |
| `igc64.dll` | 217x37 | BGRA | ✨ | ✅ | ✅ | ✅ | "Yes" and "No" text, with "No" selected; used when being asked if you want to overwrite a save-game slot | [view](/images/igc64.png) |
| `ihdsf.bke` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Genesis/Mega Drive game-list background | [view](/images/ihdsf.png) |
| `irftp.ctp` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Game Boy Advance main menu background | [view](/images/irftp.png) |
| `irmon.tax` | 1008x164 | BRGA |  | ✨ | 🚩 | ✅ | User settings screen icons and labels in Dutch | [view](/images/irmon.tax.png) |
| `itiss.ers` | 1008x164 | BRGA | ✨ | ✅ | 🚩 | ✅ | User settings screen icons and labels in Chinese | [view](/images/itiss.ers.png) |
| `jccatm.kbp` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | "Battery Empty" screen | [view](/images/jccatm.png) |
| `ke89a.bvs` | 1008x164 | BRGA |  | ✨ | 🚩 | ✅ | User settings screen icons and labels in Portuguese | [view](/images/ke89a.bvs.png) |
| `kmbcj.acp` | 640x480 | RGB565 Little Endian |  |  | ✨ | ✅ | The full-screen background image for the new button mapping screen | [view](/images/kmbcj.acp.png) |
| `ksxbar.ax` | 392x80 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | In-game menu save-state slot (position 4) | [view](/images/ksxbar.png) |
| `lfsvc.dll` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Search game-list background | [view](/images/lfsvc.png) |
| `lk7tc.bvs` | 52x192 | BGRA |  |  | ✨ | ✅ | Transparent labels for the button assignments in the new button mapping feature; these are the ones overlaid on the big SF2000 image showing the current assignments | [view](/images/lk7tc.bvs.png) |
| `lkvax.aef` | 640x480 | RGB565 Little Endian |  |  | ✨ | ✅ | History game-list background | [view](/images/lkvax.aef.png) |
| `mkhbc.rcv` | 640x1440 | RGB565 Little Endian |  |  | ✨ | ✅ | Six vertically-stacked images of the SF2000 with different buttons highlighted, used as part of the new button mapping feature's UI | [view](/images/mkhbc.rcv.png) |
| `mksh.rcv` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Search keyboard (normal) | [view](/images/mksh.png) |
| `msdmo.gdb` | 392x80 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | In-game menu save-state slot (position 1) | [view](/images/msdmo.png) |
| `msgsm.dll` | 40x24 | BGRA | ✨ | ✅ | ✅ | ✅ | Arcade game-list indicator | [view](/images/msgsm.png) |
| `mssvp.nec` | 1008x164 | BRGA |  | ✨ | 🚩 | ✅ | User settings screen icons and labels in Japanese | [view](/images/mssvp.nec.png) |
| `normidna.bin` | 40x24 | BGRA | ✨ | ✅ | ✅ | ✅ | Search game-list indicator | [view](/images/normidna.png) |
| `ntdll.bvs` | 1008x164 | BRGA |  | ✨ | 🚩 | ✅ | User settings screen icons and labels in Polish | [view](/images/ntdll.bvs.png) |
| `nvinf.hsp` | 16x240 | BGRA | ✨ | ✅ | ✅ | ✅ | Latin numbers 0 to 9 listed vertically, used for the number of games available in each main menu category | [view](/images/nvinf.hsp.png) |
| `okcg2.old` | 32x32 | BGRA |  |  | ✨ | ✅ | The star icon that appears beside favourited games in the game-lists | [view](/images/okcg2.old.png) |
| `pcadm.nec` | 1008x164 | BRGA |  | ✨ | 🚩 | ✅ | User settings screen icons and labels in Italian | [view](/images/pcadm.nec.png) |
| `pwsso.occ` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | In-game menu (position 4) | [view](/images/pwsso.png) |
| `qasf.bel` | 640x480 | RGB565 Little Endian | ✨ | ✅ | 🚩 | ✅ | User game-list background | [view](/images/qasf.bel.png) |
| `qwave.bke` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Game Boy Color main menu background | [view](/images/qwave.png) |
| `rmapi.tax` | 1008x164 | BRGA |  | ✨ | 🚩 | ✅ | User settings screen icons and labels in German | [view](/images/rmapi.png) |
| `sdclt.occ` | 120x240 | RGB565 Little Endian | ✨ | 🚩 | 🚩 | ✅ | TV system selection icons | [view](/images/sdclt.occ.png) |
| `sensc.bvs` | 1008x164 | BRGA |  | ✨ | 🚩 | ✅ | User settings screen icons and labels in French | [view](/images/sensc.bvs.png) |
| `sfcdr.cpl` | 576x1344 | BRGA | ✨ | 🚩 | ✅ | ✅ | Main menu system logos | [view](/images/sfcdr.png) |
| `subst.tax` | 1008x164 | BRGA |  | ✨ | 🚩 | ✅ | User settings screen icons and labels in Russian | [view](/images/subst.tax.png) |
| `ucby4.aax` | 1008x164 | BRGA |  | ✨ | 🚩 | ✅ | User settings screen icons and labels in Arabic | [view](/images/ucby4.aax.png) |
| `urlkp.bvs` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | NES game-list background | [view](/images/urlkp.png) |
| `uyhbc.dck` | 640x480 | RGB565 Little Endian |  |  | ✨ | ✅ | Favourites game-list background | [view](/images/uyhbc.dck.png) |
| `vidca.bvs` | 1008x164 | BRGA |  | ✨ | 🚩 | ✅ | User settings screen icons and labels in Hebrew | [view](/images/vidca.bvs.png) |
| `vssvc.nec` | 1008x164 | BRGA |  | ✨ | 🚩 | ✅ | User settings screen icons and labels in Malay | [view](/images/vssvc.nec.png) |
| `wshrm.nec` | 217x37 | BGRA | ✨ | ✅ | ✅ | ✅ | "Yes" and "No" text, with "Yes" selected; used when being asked if you want to overwrite a save-game slot | [view](/images/wshrm.png) |
| `xajkg.hsp` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Game Boy main menu background | [view](/images/xajkg.png) |
| `ztrba.nec` | 64x320 | RGB565 Little Endian |  |  | ✨ | ✅ | Non-transparent labels for the button assignments in the new button mapping feature; these are the ones that pop up when you go to change a button assignment | [view](/images/ztrba.nec.png) |

### Images (Unused)
To the best of my knowledge, the following image files are currently __unused__ by the `20230515` firmware, and were probably left over from previous devices (the SF2000 shares a bit of lineage with some USB-stick devices) or development. The images marked "Alternate UI" below appear to have been for a UI where the systems were scrolled through horizontally, and the "shortcut" games for each system were scrolled vertically.

| Filename | Resolution | Format | 03.15 | 04.20 | 05.15 | 05.22 | Description | View |
| -------- | ---------- | ------ | ----- | ----- | ----- | ----- | ----------- | ---- |
| `aeinv.bke` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Alternate UI: Genesis/Mega Drive main menu background | [view](/images/unused/aeinv.bke.png) |
| `aepic.ers` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Alternate UI: User main menu background | [view](/images/unused/aepic.ers.png) |
| `c1e.pal` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | CPS2 game-list background | [view](/images/unused/c1e.pal.png) |
| `cca.bvs` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | In-game menu (position 1; Chinese language hardcoded) | [view](/images/unused/cca.bvs.png) |
| `dectMap.key` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Button test screen (active) | [view](/images/unused/dectMap.key.png) |
| `desk.cpl` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Eight-game selection screen | [view](/images/unused/desk.cpl.png) |
| `djoin.hsp` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Alternate UI: Arcade main menu background | [view](/images/unused/djoin.hsp.png) |
| `fcont.ctp` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Alternate UI: User main menu background | [view](/images/unused/fcont.ctp.png) |
| `fdbil.ph` | 1100x120 | BGRA | ✨ | ✅ | ✅ | ✅ | Large icons for each system, including systems not supported by the SF2000 (selected) | [view](/images/unused/fdbil.ph.png) |
| `gpapi.bvs` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | In-game menu (position 5; looks like it was for some kind of button layout changing UI) | [view](/images/unused/gpapi.bvs.png) |
| `ihds.bke` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Genesis/Mega Drive game-list background, with baked-in thumbnail placeholder | [view](/images/unused/ihds.bke.png) |
| `kdill.hsp` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Alternate UI: Game Boy Advance main menu background | [view](/images/unused/kdill.hsp.png) |
| `logilda.be` | 40x24 | BGRA | ✨ | ✅ | ✅ | ✅ | CPS1 game-list indicator | [view](/images/unused/logilda.be.png) |
| `mfc64.emc` | 40x24 | BGRA | ✨ | ✅ | ✅ | ✅ | CPS2 game-list indicator | [view](/images/unused/mfc64.emc.png) |
| `mfpmp.ers` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Alternate UI: Arcade main menu background | [view](/images/unused/mfpmp.ers.png) |
| `mhg4s.ihg` | 400x192 | RGB565 Little Endian |  |  | ✨ | ✅ | Background and buttons for a "warning" prompt with "OK", "Yes" and "No" buttons. Also has rounded edges stored in a separate image file, `zaqrc.olc` | [view](/images/unused/mhg4s.ihg.png) |
| `mrtac.klo` | 40x24 | BGRA | ✨ | ✅ | ✅ | ✅ | Neo Geo game-list indicator | [view](/images/unused/mrtac.klo.png) |
| `msdtc.bke` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Alternate UI: Game Boy Advance main menu background | [view](/images/unused/msdtc.bke.png) |
| `mswbv.cpl` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Alternate UI: Game Boy Advance main menu background | [view](/images/unused/mswbv.cpl.png) |
| `nettrace.dll` | 40x24 | BGRA | ✨ | ✅ | ✅ | ✅ | Unknown game-list indicator (grey joystick with yellow buttons) | [view](/images/unused/nettrace.dll.png) |
| `nsibm.ctp` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Alternate UI: Arcade main menu background | [view](/images/unused/nsibm.ctp.png) |
| `nvinfohsp` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Alternate UI: Genesis/Mega Drive main menu background (note: there's no extension separator for this file, I suspect the file name is typo'd in the filesystem!) | [view](/images/unused/nvinfohsp.png) |
| `pcadm.hsp` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Alternate UI: User main menu background (NTSC TV system selected) | [view](/images/unused/pcadm.hsp.png) |
| `plasy.ers` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Alternate UI: Game Boy Advance main menu background | [view](/images/unused/plasy.ers.png) |
| `rmapi.cpl` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Alternate UI: User main menu background (English UI language selected) | [view](/images/unused/rmapi.cpl.png) |
| `seltMap.key` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Button test screen | [view](/images/unused/seltMap.key.png) |
| `spmpm.gdp` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Alternate UI: NES game-list background, with baked-in thumbnail placeholder | [view](/images/unused/spmpm.gdp.png) |
| `subst.bke` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Alternate UI: Arcade main menu background | [view](/images/unused/subst.bke.png) |
| `tsmcf.cpl` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Alternate UI: Arcade main menu background | [view](/images/unused/tsmcf.cpl.png) |
| `url.bvs` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | CPS1 game-list background | [view](/images/unused/url.bvs.png) |
| `werui.ioc` | 320x240 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | "NODATA" save-state thumbnail placeholder image, with a "horror" style typeface | [view](/images/unused/werui.ioc.png) |
| `wshom.ocx` | 1100x120 | BGRA | ✨ | ✅ | ✅ | ✅ | Large icons for each system, including systems not supported by the SF2000 (normal) | [view](/images/unused/wshom.ocx.png) |
| `x86e.hgp` | 640x480 | RGB565 Little Endian | ✨ | ✅ | ✅ | ✅ | Neo Geo game-list background | [view](/images/unused/x86e.hgp.png) |
| `zaqrc.olc` | 8x224 | BGRA |  |  | ✨ | ✅ | Rounded ends that pair with the warning dialogue stored in `mhg4s.ihg` | [view](/images/zaqrc.olc.png) |

### Other Files
These are other files that have been identified, which don't fit into the other categories. Non-Latin characters in the files are encoded in UTF-8.

| Filename | 03.15 | 04.20 | 05.15 | 05.22 | Description |
| -------- | ----- | ----- | ----- | ----- | ----------- |
| `Archive.sys` | ✨ | 🚩 | ✅ | ✅ | Stores the settings for UI language and TV system. Two 32-bit words (4-bytes), little endian. The first is UI language; `0x00000000` is English, `0x01000000` is Chinese, etc.. The second is the TV system setting; `0x00000000` is NTSC, `0x01000000` is PAL. Note the "🚩" icon here indicates the format of the data, or the permissible values were changed (as opposed to the data itself, which will vary from device to device based on user settings) |
| `bfrjd.odb` |  | ✨ | 🚩 | ✅ | UI strings in Korean |
| `bxvtb.sby` |  | ✨ | 🚩 | ✅ | UI strings in Thai |
| `dufdr.cwr` |  | ✨ | 🚩 | ✅ | UI strings in Turkish |
| `eknjo.ofd` |  | ✨ | 🚩 | ✅ | UI strings in Spanish |
| `fhshl.skb` | ✨ | ✅ | 🚩 | ✅ | UI strings in English |
| `Foldername.ini` | ✨ | 🚩 | 🚩 | ✅ | Used to control menu rotation for the main menu; see below for more notes on this |
| `History.bin` |  |  | ✨ | ✅ | Used to store the history of played ROMs; only appears after the first game is played after installing the 05.15 or later firmware. User ROMs are not added to history, only built-in games. If a built-in game that is referenced in history is removed from the device, the device will crash when trying to view the History screen. You can delete the History.bin file to clear the device's history; there is no built-in functionality to do so |
| `jsnno.uby` |  | ✨ | 🚩 | ✅ | UI strings in Dutch |
| `kcbn7.avc` |  | ✨ | ❌ |  | Duplicate copy of `bisrv.asd`, the main firmware for the device which is found in the BIOS folder  |
| `KeyMapInfo.kmp` |  |  | ✨ | ✅ | Used to store the user-assignable global button mappings for each emulated system |
| `lf9lb.cut` |  | ✨ | 🚩 | ✅ | UI strings in Portuguese |
| `ntrcq.oba` |  | ✨ | 🚩 | ✅ | UI strings in Japanese |
| `ouenj.dut` |  | ✨ | 🚩 | ✅ | UI strings in Polish |
| `qdbec.ofd` |  | ✨ | 🚩 | ✅ | UI strings in Italian |
| `sgotd.cwt` |  | ✨ | 🚩 | ✅ | UI strings in French |
| `snbqj.uby` |  | ✨ | 🚩 | ✅ | UI strings in German |
| `t2act.sgf` | ✨ | ✅ | 🚩 | ✅ | UI strings in Chinese |
| `Test.zsf` |  | ✨ | ❌ |  | A SNES ROM, which displays a controller test program |
| `tvctu.uby` |  | ✨ | 🚩 | ✅ | UI strings in Russian |
| `vdaz5.bjk` |  | ✨ | 🚩 | ✅ | UI strings in Arabic |
| `wtrxj.lbd` |  | ✨ | 🚩 | ✅ | UI strings in Malay |
| `xjebd.clq` |  | ✨ | 🚩 | ✅ | UI strings in Hebrew |

#### Foldername.ini
This file controls some of the UI settings for the main menu. It's a plain-text file, but not an actual INI file. It's contents from the May 22nd firmware (just as an example) are as follows:

```
SF2000
17
FFFFFF
FF8000 ROMS
FF8000 FC
FF8000 SFC
FF8000 MD
FF8000 GB
FF8000 GBC
FF8000 GBA
FF8000 ARCADE
FF8000 ROMS
FF8000 ROMS
8 7 0
24 184 144 208
40 24


```

And here's my current understanding of what each line is used for:

- `SF2000`: The name of the device; I don't believe it's actively used anywhere, please correct me if I'm wrong!
- `17`: The number of languages supported by the firmware
- `FFFFFF`: Hexadecimal colour (RGB) for the general game-list texts, and the `x/yyy` game count in the top-right corner of each game-list
- `FF8000 ROMS`: The first defined main menu section (the sections that are scrolled vertically on the main menu). Internally they are numbered from 0; so the `ROMS` section (user ROMs and settings) is 0, `FC` (NES) is 1, `SFC` (SNES) is 2, etc.. The `FF8000` is the hexadecimal colour (RGB) to display the text of the currently selected/highlighted game in the list; the default colour is orange. _Side note:_ after the `ARCADE` section, there's two additional `ROMS` sections; the firmware is hard-coded to have ten sections. The SF2000 appears to share its firmware with other similar devices, and some of those devices feature different menu sections (e.g., "CPS1", "Neo Geo", etc.). I suspect that the best of those systems has ten sections in its main menu, which doesn't match up with the eight sections on the SF2000 (seven supported systems + the user ROMs/settings section). As the firmware requires ten sections to be defined, they just repeated the `ROMS` section to fill in the remaining places. Like I say, that's just a guess!
- `8 7 0`: This is used to control the main menu rotation. `8` tells the firmware how many main menu sections are actually in-use on this device; for the SF2000 that's seven supported consoles + the user ROMs/settings section, for eight total. `7` tells the firmware which menu section to default to when the device boots up, which is why by default it always starts in the `ARCADE` section. `0` tells the firmware which section to display the special "user settings" menu on (the one with History, Favourites, TV System, Language, etc.). So for example, if you wanted the SF2000 to start up on the user ROMs/settings screen instead of Arcade, you could change this line to read `8 0 0`
- `24 184 144 208`: These numbers control the position and size of the game artwork in each system's game-list. The first two numbers are the X and Y coordinates from the top-left corner of the screen for where to start drawing the artwork; the second two numbers are the width and height of the artwork to draw. Note that the SF2000 doesn't do any image scaling; the dimensions are for the rectangular area the device will begin adding each pixel of the source artwork to. If the artwork's dimensions don't exactly match the dimensions specified here, the artwork will not display properly
- `40 24`: The width and height of the icon shown beside the currently selected/highlighted game in a game-list. Again, these are the dimensions of the rectangular area the SF2000 draws the pixel data into, so if these numbers don't match the dimensions of the list indicator image, the image will not display properly

NOTE: While the text colours above work just fine with the SF2000 _first_ boots up, after loading a game and returning to the menu the general game-list/game count colour reverts to an off-white colour, and is likely being pulled from inside the BIOS somewhere. Also note that currently there is no way to choose a highlight colour for the Favourites or History sections - those are fixed at the stock orange colour (FF8000), and are almost certainly hardcoded in the BIOS as well.


### ROM Lists
Credit for this section goes to `taizou#9644`, author of [FROGTOOL](https://github.com/tzlion/frogtool). These files relate to the built-in game-lists under each main system; the list of games is pulled from these files instead of being built at runtime - annoying, but presumably for performance reasons. It means if you want to change the list of built-in games (instead of using the User ROMs section), you have to edit these files - hence FROGTOOL, you should really check it out.

| Files | Description |
| ----- | ----------- |
| `mfpmp.bvs` (Arcade), `mgdel.bvs` (Game Boy Color), `nethn.bvs` (NES), `qdvd6.bvs` (Game Boy), `sppnp.bvs` (Game Boy Advance), `wmiui.bvs` (Genesis/Mega Drive), `xvb6c.bvs` (SNES) | Pinyin translations of the English ROM names, used for Chinese language searching. Not all game names are translated |
| `adsnt.nec` (SNES), `fhcfg.nec` (NES), `htuiw.nec` (Game Boy Advance), `msdtc.nec` (Arcade), `setxa.nec` (Genesis/Mega Drive), `umboa.nec` (Game Boy), `wjere.nec` (Game Boy Color) | Chinese translations of the English ROM names, used to display the game-lists when the UI language is set to Chinese. Not all game names are translated |
| `mswb7.tax` (Arcade), `pnpui.tax` (Game Boy Color), `rdbui.tax` (NES), `scksp.tax` (Genesis/Mega Drive), `urefs.tax` (SNES), `vdsdc.tax` (Game Boy), `vfnet.tax` (Game Boy Advance) | English ROM Names, used to display the game-lists when the UI language is set to English |
| `xfgle.hgp`, `xfgle.hgp.bak` | The `xfgle.hgp` file contains the ROM "shortcuts" on the main menu for each game system. The `xfgle.hgp.bak` file appears to be a test version of this file that was not removed from the firmware before being sent to production |
| `TSMFK.TAX` | This is a ROM list file similar to the other `.tax` files, except it is built at run-time from the ROM files in the user roms folder. The file is regenerated each time the device boots |

### Sounds
There are several sound files in the `20230420` firmware, stored in raw signed 16-bit PCM format (mono, little-endian at 22050 Hz). The SF2000 seems to play the files back at an incorrect sample rate vs. the raw data; if you want to customise the background music, resample your audio to 21560 Hz (21561.1 Hz is technically precise, but 21560 Hz is easer to remember, and all but the most exacting of human ears is unlikely to detect the difference), and then speed the audio up to 22050 Hz, using the resulting audio as the raw data (credit to `notv37#4200` in Discord for doing the initial discovery math, and to ``osaka#9664` for doing technical follow-up in the firmware - you can [read their deep-dive into the details here](https://discord.com/channels/741895796315914271/1099465777825972347/1112643797344583710) (Discord link)).

If you want to do it using [Audacity](https://www.audacityteam.org/) , the steps are:

1. Open your audio file
2. Click the "Audio Setup" button on the top toolbar, choose "Audio Settings..."
    * Set "Project Sample Rate" to "22050 Hz"
    * Click "OK"
3. Click the "Select" button in the lower-left corner of your audio track area to select all the audio
4. If your track is stereo, downmix to mono: "Tracks" menu > "Mix" > "Mix Stereo Down to Mono"
5. "Tracks" menu > "Resample..."
    * Set "New sample rate (Hz)" to "22050"
    * Click "OK"
6. "Effect" menu > "Pitch and Tempo" > "Change Speed..."
    * Set "Speed Multiplier" to "1.023"
    * Click "Apply" (your audio will now sound slightly too high-pitched if you play it back, but don't worry - the SF2000 plays everything slightly slow/low-pitched, so we speed/pitch things up before exporting so it plays back correctly)
7. "File" menu > "Export" > "Export Audio..."
    * Set "Save as type" to "Other uncompressed files"
    * In "Format Options", set "Header" to "RAW (header-less)"; set "Encoding" to "Signed 16-bit PCM"
    * Enter your "File name", and click "Save"
    * If the "Edit Metadata Tags" window appears, just leave everything blank and click "OK"

| Filename | 03.15 | 04.20 | 05.15 | 05.22 | Description | Listen |
| -------- | ----- | ----- | ----- | ----- | ----------- | ------ |
| `c2fkec.pgt` | ✨ | ✅ | 🚩 | ✅ | "Popping" sound that is played when moving around the search keyboard | [listen](/sounds/c2fkec.pgt.mp3) |
| `dpnet.dll` | ✨ | ✅ | ✅ | ✅ | "Downwards Zap" sound, unknown usage | [listen](/sounds/dpnet.dll.mp3) |
| `dsreg.bvs` | ✨ | ✅ | ✅ | ✅ | "Upwards Bleeping" sound, unknown usage | [listen](/sounds/dsreg.bvs.mp3) |
| `help.lis` | ✨ | ✅ | ✅ | ✅ | "Double Buzzer" sound, unknown usage | [listen](/sounds/help.lis.mp3) |
| `mfsvr.nkf` | ✨ | ✅ | 🚩 | ✅ | "Beep" sound that is played when entering a letter on the search keyboard | [listen](/sounds/mfsvr.nkf.mp3) |
| `nyquest.gdb` | ✨ | ✅ | 🚩 | ✅ | "Whooshing" sound that is played when switching between emulated systems on the main menu, between the "Resume", "Quit", "Load" and "Save" options on the in-game menu, and scrolling by pages within a system's game-list | [listen](/sounds/nyquest.gdb.mp3) |
| `oldversion.kbe` | ✨ | ✅ | 🚩 | ✅ | "Three Note Upward Chime" sound that is played when deleting a letter on the search keyboard | [listen](/sounds/oldversion.kbe.mp3) |
| `pagefile.sys` | ✨ | ✅ | 🚩 | ✅ | Main menu background music. If you don't like background music, and would rather just have silence, you can [find a replacement silent `pagefile.sys` here](/sounds/silentMusic/pagefile.sys) - just replace the one in the `Resources` folder (don't forget to backup the original file first, in case you ever want that jaunty tune again!) | [listen](/sounds/pagefile.sys.mp3) |
| `swapfile.sys` | ✨ | ✅ | ✅ | ✅ | "Squishy" sound played when navigating horizontally through "shortcut" games on the main menu, or vertically within a system's game-list | [listen](/sounds/swapfile.sys.mp3) |

### Unknown Files
These are files that I have not yet determined what they do; if anyone has any information on these, do post about it in the Data Frog channel in the Retro Handhelds Discord server please!

| Filename | 03.15 | 04.20 | 05.15 | 05.22 | Description |
| -------- | ----- | ----- | ----- | ----- | ----------- |
| `kcnuv.lit` | ✨ | ✅ | ✅ | ✅ | UNKNOWN; a bunch of 4-byte binary chunks (e.g., `0xC4 0x00 0x00 0x00`), followed by a list of .NES ROM file names. Very similar to the `.bvs`/`.nec`/`.tax` files detailed above, but doesn't have the same type of "header" they have |

---

## Tools and Links
All of these are linked above already in their relevant sections, but just in case you prefer to see them as a pulled-out list, here they are again:

- [BIOS CRC32 Patcher](https://vonmillhausen.github.io/sf2000/tools/biosCRC32Patcher.htm)
- [Boot Logo Changer](https://vonmillhausen.github.io/sf2000/tools/bootLogoChanger.htm)
- [Button Mapping Tool](https://vonmillhausen.github.io/sf2000/tools/buttonMappingChanger.htm)
- [Data Frog's firmware update tutorial](https://www.youtube.com/watch?v=j8dT2fdGfck)
- [FROGTOOL](https://github.com/tzlion/frogtool) (for updating the built-in game lists)
- [Generic Image Tool](https://vonmillhausen.github.io/sf2000/tools/genericImageTool.htm)
- [Silent background music file](/sounds/silentMusic/pagefile.sys) (replace the file in the `Resources` folder on the microSD card)

---

## Version History
- `20230529 - 1.14`: Updated the main menu BGM sample rate details with the latest findings from `osaka#9664`. Clarified which menu text colour resets after exiting a game. Added a note about charging safety (thanks for your sacrifices, `Zerter#4954`! 🫡)

- `20230526 - 1.13`: Updated Audacity instructions to support latest version of Audacity. Added a BIOS CRC32 patcher tool for the reckless and brave. Added a note about `Foldername.ini` text colours reverting after loading a game (thanks `Zerter#4954`!)

- `20230525 - 1.12`: Added a section about the internals of the `Foldername.ini` file. Added a note to the Arcade section about the "inrom" column in `adcockm#8175`'s metadata document. Added a small firmware note for the May 22nd about community-spotted GBA performance improvements. Added specific emulator versions and Git commit links for each emulator (thanks `osaka#9664` and `notv37#4200`!). Added specific steps for producting SF2000-format audio files using Audacity.

- `20230524 - 1.11`: Added my new [Generic Image Tool](https://vonmillhausen.github.io/sf2000/tools/genericImageTool.htm). Added more exceptional information from `adcockm#8175` in regards to arcade emulation on the SF2000, and cleaned up the old info accordingly. Corrected some typos related to `bisrv.asd` (thanks `Luke#4448`!). Usage of `nvinf.hsp` was tracked down to the numbers of games available on the main menu pages (thanks `kid_sinn#9691`!).

- `20230522 - 1.10`: Updated resource tables for the new `05.22` firmware (no changes); added a table with details about known firmware versions. Added a "Tools & Links" section.

- `20230516 - 1.9`: Updated most of the Resources file lists to include firmware-related information (added, (un)changed, removed). Added new image resources for the latest May 15th firmware. Updated some images files previews to contain the fake name extensions as well. Added detail about the removal of per-game button maps from May 15th firmware. Renamed the sound previews to contain the fake name extensions as well.

- `20230513 - 1.8`: Discovered two "unused" images (the yes/no buttons) are indeed actually used, when being asked if you want to overwrite a saved game. Fixed a few typos. Changed formatting of file names used throughout. A bit more info on A/V out.

- `20230512 - 1.7`: Added a note about stock battery runtime. Added a section with information about A/V output performance. Added a bit of info about PAL/NTSC region speed for Genesis/Mega Drive. Retitled the "bisrv.asd" section to make it clearer that's the BIOS/firmware. 

- `20230511 - 1.6`: Added a quick note about the display panel to the Hardware section, and added a new section for Emulators, including an incredible collection of ROM notes for Arcade thanks to `adcockm#8175`! Also added a "silent" background music file for download, and a table of contents (this page is getting fairly long 😅). Added a `favicon.ico` to get rid of that one annoying console error.

- `20230510 - 1.5`: Added additional detail to the Hardware section about the buttons, d-pad, thumb-stick, battery, and wireless controller support.

- `20230510 - 1.4`: Added my own version of `osaka#9664`'s button mapping tool at their request, and changed the link in the Key Mapping section accordingly.

- `20230509 - 1.3`: Added more details about how the boot logo ends up scaled on the screen, as well as a link to a new tool I wrote for altering the logo. Corrected one small formatting error.

- `20230508 - 1.2`: Added details for `Archive.sys` - thanks to `osaka#9664` for the hints on what it related to!

- `20230507 - 1.1`: Some "unknown" files from the `Resources` folder identified with `taizou#9644`'s help (thanks!); moved them to the Sounds and Rom Lists sections with details. Only two files left!

- `20230507 - 1.0`: Original creation of this page.
