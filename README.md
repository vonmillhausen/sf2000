# SF2000
The SF2000 is a cheap hand-held emulation gaming console which was released in early 2023. Although the device itself is sold by a variety of vendors, it was the vendor "Data Frog" who caught public attention, and so the device is often simply referred to as "the Data Frog".

For a cheap device, it's actually fairly capable - most Game Boy, Game Boy Color, NES and Genesis/Mega Drive games play at full speed, and many arcade, Game Boy Advance and SNES titles do as well. The device has an IPS panel (not OCA laminated), and a user-replacable "18650" battery, which can be charged via a USB-C port on the device. It also has analog A/V out (note: not HDMI), meaning it can be connected to a CRT TV - the type of display most arcade, Genesis/Mega Drive and SNES games were originally intended to be displayed on. It has a built-in 2.4GHz antenna, and can receive input from a compatible wireless controller (usually sold separately).

Some downsides to the device: it's mono-only, there's no head-phone jack (although there is a volume wheel), screen brightness cannot be altered (it's fairly bright), SNES and Game Boy Advance are hit-or-miss in terms of performance (some games are fine, many games run slowly), the stock firmware is closed-source so the device's performance may never get any better than as-shipped, and some folks have had issues with the buttons (they're quite cheap, and sit flush when pressed).

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
  - [Firmware/BIOS (biserv.asd)](#firmwarebios-biservasd)
    - [Button Mappings/Key Bindings](#button-mappingskey-bindings)
    - [Boot Logo](#boot-logo)
  - [Resources](#resources)
    - [Fonts](#fonts)
    - [Images (Used)](#images-used)
    - [Images (Unused)](#images-unused)
    - [Other Files](#other-files)
    - [ROM Lists](#rom-lists)
    - [Sounds](#sounds)
    - [Unknown Files](#unknown-files)
  - [Version History](#version-history)

---

## Hardware

### CPU
Although the main CPU of the SF2000 has literally had it's markings milled off by a routing tool, the community has determined that it's a HCSEMI B210, a single-core MIPS processor running at 810 MHz. It appears to be a clone of an ALi Tech chip. No SDK is currently available for it, and the device is closed-source.

### Display
The SF2000 features a `240x320` IPS display panel (not OCA laminated), which has been rotated 90&deg; clockwise to give a `320x240` display. It demonstrates screen tearing for all emulators, running from the right of the console to the left due to the panel rotation.

### Buttons
The ABXY are basically a clone of the original SNES controller buttons. Although everyone seems to be getting two purple and two lilac coloured buttons, there's a disparity to the _type_ of buttons folks are getting - some get two convex and two concave buttons, others have gotten three concave and one convex, etc..

It has been reported that both the buttons and the underlying membrane from an original SNES controller can be swapped into the SF2000, which may improve the "feel" of the buttons. Note that the SF2000 uses ABXY buttons that have two plastic tabs sticking out to keep them in the shell (at 180 degrees from each other); some after-market SNES-style buttons have _three_ tabs, and won't fit the housing.

Some folks have modded the stock ABXY buttons on their SF2000s by adding a thin strip of tape or other thin material into the circular depression under each button - this causes the buttons to be raised a bit higher out of the shell, and to not sink as far into the shell when the button is pressed.

### D-Pad
Just like the ABXY buttons, the d-pad is a clone of the SNES d-pad. It has been reported that an original SNES d-pad and membrane can be swapped into the SF2000 as well.

### Thumb Stick
The SF2000 uses a Switch-style thumb stick that does _not_ depress for L2/R2. It is compatible with Switch thumb stick third-party covers.

### Battery
The SF2000 takes a 18650 type rechargable battery, which is easily user replacable (it's behind a battery door with a screw), and comes with a 1,500mAh one which runs for about 4 hours. 18650 batteries with and without "nubs" both fit fine. The console has built-in over-charge protection, but _does not have under-charge protection, so for safety do not leave the console turned on when the battery is low_. From when it displays a full-screen low battery indicator, it takes about 3.5 hours to charge the stock battery. The green charging light does _not_ turn off when fully charged.

### Wireless Connectivity
The SF2000 does not feature WIFI or Bluetooth, but it _does_ have a 2.4Ghz antenna to support local wireless multiplayer using a compatible 2.4Ghz wireless controller for Player 2. The Y2 SFC wireless controller and the SF900 wireless controller have both been reported to work fine.

### A/V Output
The SF2000 features a mini-jack for analogue composite A/V output. The device is capable of output a user-selectable PAL or NTSC video signal. Only the _left_ audio channel is output - the device does _not_ down-mix to mono, which results in missing audio channels in games that expect to output stereo sound.

There's some limited evidence to suggest the A/V output is at 576i. When outputting a PAL signal, while the signal is indeed 50Hz, it seems like the emulators are still targeting 60Hz output - PAL scrolling is "jerky". Switching the device to output NTSC, scrolling becomes smooth. This holds true regardless of using a PAL or NTSC version of a ROM.

Video output over A/V is also somewhat heavily cropped on all screen edges - this may result in UI elements at screen edges in games (health bars, remaining credits, etc.) being out-of-frame. Switching between PAL and NTSC doesn't alter the visible screen area.

On my own unit, plugging in a charging cable while outputting over A/V introduces a lot of video noise in the A/V signal; so those planning to use the SF2000 as a TV console may need to do so while running on battery for the best experience.

---

## Emulators

The device advertises support for arcade, NES, SNES, Genesis/Mega Drive, Game Boy, Game Boy Color and Game Boy Advance; it also supports loading Master System ROMs. SNES and GBA performance are very hit-or miss (more miss than hit, really); the other consoles actually perform fairly well. All consoles currently stretch their output to fill the display, and do not maintain aspect ratio.

The SF2000 appears to be using Libretro with a custom front-end (i.e., not RetroArch).

### Arcade
The device is running some version of Final Burn Alpha - it ships with a subset of the v0.2.97.24 ROM set, so likely that version. `adcockm#8175` from the Retro Handhelds Discord did some phenomenal work checking the full v0.2.97.24 against the device's April 20th firmware - thanks `adcockm#8175`! The below table has their findings:

| List | Name | Description |
| ---- | ---- | ----------- |
| [view](/text/inrom_sf2000_fba.txt) | On microSD | These were the ROMs included on the microSD card shipped with the device |
| [view](/text/notlistedinrom_sf2000_fba.txt) | Not Listed | The SF2000's firmware contains a list of FBA ROM names, including ROMs not included on the microSD card - it is assumed these are the only games the flavour of FBA on the SF2000 knows about. This text file contains a list of the ROMs from the v0.2.97.24 set that were _not_ listed in the firmware; these are assumed to be incompatible, and were not tested |
| [view](/text/testednoload_sf2000_fba.txt) | No Load | These ROMs immediately hung the emulator without any indication it had loaded any files successfully |
| [view](/text/testedloadhang_sf2000_fba.txt) | Load Hang | These ROMs indicated they were loading some files on startup, but hung before completing |
| [view](/text/testedloadcorrupt_sf2000_fba.txt) | Load Corrupt | These ROMs appeared to complete loading, but only showed severe graphical corruption (e.g., garbage, static, a black screen, etc.) and usually wouldn't allow exit back to the SF2000's menu via start+select |
| [view](/text/working_sf2000_fba.txt) | Working | These ROMs loaded successfully; note that "working" does not mean "works perfectly" - some may be too slow to play, may not have any audio, may not be controllable (e.g., light-gun games), etc. - they just finish loading successfully |

### NES
Appears to be a version of FCEUMM. There are references in the firmware to different NES palettes, but there's no interface or configuration for the emulator itself to choose one. On the original firmware, the A and B buttons were swapped. See "[Button Mappings/Key Bindings](#button-mappingskey-bindings)" section below.

### SNES
With the April 20th version of the firmware, SNES games appear to run very slowly _on first launch_; but if you exit the game and load it again, it usually starts performing _much_ better.

### Genesis/Mega Drive
Works pretty well. This emulator is capable of loading Master System ROMs if placed in the user ROMs folder on the microSD card; Game Gear ROMs do not load. Some PAL-region games may run too fast; NTSC-region games seem to always run at the correct speed. On the original firmware, A was mapped to A, B was mapped to B, and RB was mapped to C for some reason. See "[Button Mappings/Key Bindings](#button-mappingskey-bindings)" section below.

### Game Boy
Uses a black and white colour palette, which currently cannot be changed. On the original firmware, the A and B buttons were swapped. See "[Button Mappings/Key Bindings](#button-mappingskey-bindings)" section below.

### Game Boy Color
On the original firmware, the A and B buttons were swapped. See "[Button Mappings/Key Bindings](#button-mappingskey-bindings)" section below.

### Game Boy Advance
Performance is fairly poor. On the original firmware, A and B buttons are mapped correctly, but the GBA shoulder buttons are mapped to X and Y for some reason. See "[Button Mappings/Key Bindings](#button-mappingskey-bindings)" section below.

---

## Firmware/BIOS (biserv.asd)
The firmware for the SF2000 is actually located on the microSD card, in a file called `biserv.asd` located in the BIOS folder. This file is a monolithic binary blob, which contains the device's OS, the emulators, their settings... basically everything. There is not currently any custom firmware (CFW) for the device. The stock firmware is currently being investigated; here are some findings from it:

### Button Mappings/Key Bindings
`osaka#9664` discovered that the OS supports loading game-specific key bindings from `.kmp` files, stored in the `save` folder for each system and named after a game's ROM file (e.g., `/FC/save/Game Name.kmp`). They also discovered where in the `biserv.asd` file the default mappings for each emulator are stored. Working with this information, `notv37#4200` worked out what bits related to what buttons for each emulator. Using both their findings, we now have a tool which can be used to update both the global button mappings for the emulators, as well as create per-ROM mappings - you can [find this tool here](https://vonmillhausen.github.io/sf2000/tools/buttonMappingChanger.htm).

### Boot Logo
When the device is powered on, a "Welcome" image is displayed for a short time before the main menu appears. This image comes from inside `biserv.asd`, at offset `0x9B91D8`. It's a `512x200` RGB565 Little Endian raw image file, and looks like this:

![Boot Logo](/images/bootlogo.png)

The image is _actually_ displayed at half-resolution though, `256x100`, centred in the middle of the screen. The boot logo can be changed to an arbitrary `256x100` image using a web-based tool I wrote, which you can [find here](https://vonmillhausen.github.io/sf2000/tools/bootLogoChanger.html).

---

## Resources
The Resources folder on the microSD card contains all of the resources used by the device's firmware to construct the user interface at runtime. The following tables list the files from the `20230420` firmware and what they are used for, grouped by broad categories:

### Fonts
| Filename | Description |
| -------- | ----------- |
| Arial_cn.ttf | The "Arial" typeface, containing Latin, Greek, Cyrillic, Chinese, and Japanese characters. Duplicate of `yahei_Arial.ttf`, the single font file from the original firmware version |
| Arial_en.ttf | The "Arial" typeface, containing Latin, Greek, Cyrillic, Armenian, Hebrew and Arabic characters |
| Arial_jp.ttf | The "Arial" typeface, containing Latin, Greek, Cyrillic, Chinese and Japanese characters |
| Arial_kr.ttf | The "Arial" typeface, containing Latin, Greek, Cyrillic, Chinese, Japanese and Korean characters |
| Tahoma.ttf | The "Tahoma" typeface, containing Latin, Greek, Cyrillic, Armenian, Hebrew, Arabic and Thai characters  |
| yahei_Arial.ttf | The "Arial" typeface, containing Latin, Greek, Cyrillic, Chinese, Japanese and Korean characters |

### Images (Used)
As far as I am aware, all of the below images are actively used by the `20230420` version of the firmware; happy to take any corrections if it turns out any of them are unused! Note that while the stock theme is based around a `640x480` resolution, the actual _display_ on the SF2000 is a `320x240` one. The OS on the device uses nearest-neighbour scaling for its images, giving the stock UI a somewhat aliased appearance. If you're planning to make your own theme for the SF2000, design it for `320x240`, and then double the resolution when exporting the final images to the device for a crisper look.

| Filename | Resolution | Format | Description | View |
| -------- | ---------- | ------ | ----------- | ---- |
| aepic.nec | 576x256 | BGRA | Main menu labels in Korean | [view](/images/aepic.png) |
| apisa.dlk | 640x480 | RGB565 Little Endian | Arcade game list background | [view](/images/apisa.png) |
| appvc.ikb | 150x214 | BRGA | Game art placeholder | [view](/images/appvc.png) |
| awusa.tax | 576x256 | BRGA | Main menu labels in Thai | [view](/images/awusa.png) |
| bisrv.nec | 640x480 | RGB565 Little Endian | In-game menu (position 3) | [view](/images/bisrv.png) |
| bttlve.kbp | 60x144 | BGRA | Battery level indicator icons | [view](/images/bttlve.png) |
| c1eac.pal | 640x480 | RGB565 Little Endian | SNES game-list background | [view](/images/c1eac.png) |
| cero.phl | 640x480 | RGB565 Little Endian | Game Boy Color game-list background | [view](/images/cero.png) |
| certlm.msa | 40x24 | BGRA | NES game-list indicator | [view](/images/certlm.png) |
| d2d1.hgp | 640x480 | RGB565 Little Endian | In-game menu (position 2) | [view](/images/d2d1.png) |
| dism.csf | 640x480 | RGB565 Little Endian | In-game menu (position 1) | [view](/images/dism.png) |
| djctq.rsd | 40x24 | BGRA | SNES game-list indicator | [view](/images/djctq.png) |
| djoin.nec | 576x256 | BRGA | Main menu labels in Spanish | [view](/images/djoin.png) |
| dpskc.ctp | 640x320 | RGB565 Little Endian | In-game menu save-state slots (positions 1, 2, 3 and 4) | [view](/images/dpskc.png) |
| drivr.ers | 640x480 | RGB565 Little Endian | SNES main menu background | [view](/images/drivr.png) |
| dsuei.cpl | 640x480 | RGB565 Little Endian | User ROMs main menu background | [view](/images/dsuei.png) |
| dxdiag.bin | 40x24 | BGRA | Genesis/Mega Drive game-list indicator | [view](/images/dxdiag.png) |
| dxkgi.ctp | 576x256 | BRGA | Main menu labels in English | [view](/images/dxkgi.png) |
| dxva2.nec | 640x480 | RGB565 Little Endian | Search keyboard (pressed) | [view](/images/dxva2.png) |
| ectte.bke | 161x126 | BRGA | Main menu icon selection box | [view](/images/ectte.png) |
| efsui.stc | 640x480 | RGB565 Little Endian | Game Boy Advance game-list background | [view](/images/efsui.png) |
| esent.bvs | 576x256 | BRGA | Main menu labels in Turkish | [view](/images/esent.png) |
| exaxz.hsp | 152x1224 | BRGA | Main menu "Games Exist" and "Start: Open" labels for all languages | [view](/images/exaxz.png) |
| fixas.ctp | 640x480 | RGB565 Little Endian | NES main menu background | [view](/images/fixas.png) |
| fltmc.sta | 640x480 | RGB565 Little Endian | Game Boy game-list background | [view](/images/fltmc.png) |
| fvecpl.ai | 40x24 | BGRA | Game Boy game-list indicator | [view](/images/fvecpl.png) |
| gpsvc.bvs | 392x80 | RGB565 Little Endian | In-game menu save-state slot (position 3) | [view](/images/gpsvc.png) |
| hctml.ers | 640x480 | RGB565 Little Endian | Arcade main menu background | [view](/images/hctml.png) |
| hgcpl.cke | 392x80 | RGB565 Little Endian | In-game menu save-state slot (position 2) | [view](/images/hgcpl.png) |
| hlink.bvs | 640x480 | RGB565 Little Endian | Search keyboard (hover) | [view](/images/hlink.png) |
| htui.kcc | 40x24 | BGRA | Game Boy Color game-list indicator | [view](/images/htui.png) |
| icm32.dll | 40x24 | BGRA | Game Boy Advance game-list indicator | [view](/images/icm32.png) |
| icuin.cpl | 640x480 | RGB565 Little Endian | Genesis/Mega Drive main menu background | [view](/images/icuin.png) |
| igc64.dll | 217x37 | BGRA | "Yes" and "No" text, with "No" selected; used when being asked if you want to overwrite a save-game slot | [view](/images/igc64.png) |
| ihdsf.bke | 640x480 | RGB565 Little Endian | Genesis/Mega Drive game-list background | [view](/images/ihdsf.png) |
| irftp.ctp | 640x480 | RGB565 Little Endian | Game Boy Advance main menu background | [view](/images/irftp.png) |
| irmon.tax | 576x256 | BRGA | Main menu labels in Dutch | [view](/images/irmon.png) |
| itiss.ers | 576x256 | BRGA | Main menu labels in Chinese | [view](/images/itiss.png) |
| jccatm.kbp | 640x480 | RGB565 Little Endian | "Battery Empty" screen | [view](/images/jccatm.png) |
| ke89a.bvs | 576x256 | BRGA | Main menu labels in Portuguese | [view](/images/ke89a.png) |
| ksxbar.ax | 392x80 | RGB565 Little Endian | In-game menu save-state slot (position 4) | [view](/images/ksxbar.png) |
| lfsvc.dll | 640x480 | RGB565 Little Endian | Search game-list background | [view](/images/lfsvc.png) |
| mksh.rcv | 640x480 | RGB565 Little Endian | Search keyboard (normal) | [view](/images/mksh.png) |
| msdmo.gdb | 392x80 | RGB565 Little Endian | In-game menu save-state slot (position 1) | [view](/images/msdmo.png) |
| msgsm.dll | 40x24 | BGRA | Arcade game-list indicator | [view](/images/msgsm.png) |
| mssvp.nec | 576x256 | BRGA | Main menu labels in Japanese | [view](/images/mssvp.png) |
| normidna.bin | 40x24 | BGRA | Search game-list indicator | [view](/images/normidna.png) |
| ntdll.bvs | 576x256 | BRGA | Main menu labels in Polish | [view](/images/ntdll.png) |
| pcadm.nec | 576x256 | BRGA | Main menu labels in Italian | [view](/images/pcadm.png) |
| pwsso.occ | 640x480 | RGB565 Little Endian | In-game menu (position 4) | [view](/images/pcadm.png) |
| qasf.bel | 640x480 | RGB565 Little Endian | User game-list background | [view](/images/qasf.png) |
| qwave.bke | 640x480 | RGB565 Little Endian | Game Boy Color main menu background | [view](/images/qwave.png) |
| rmapi.tax | 576x256 | BRGA | Main menu labels in German | [view](/images/rmapi.png) |
| sdclt.occ | 120x2280 | RGB565 Little Endian | TV system and UI language selection icons | [view](/images/sdclt.png) |
| sebsc.bvs | 576x256 | BRGA | Main menu labels in French | [view](/images/sebsc.png) |
| sfcdr.cpl | 576x1344 | BRGA | Main menu system logos | [view](/images/sfcdr.png) |
| subst.tax | 576x256 | BRGA | Main menu labels in Russian | [view](/images/subst.png) |
| ucby4.aax | 576x256 | BRGA | Main menu labels in Arabic | [view](/images/ucby4.png) |
| urlkp.bvs | 640x480 | RGB565 Little Endian | NES game-list background | [view](/images/urlkp.png) |
| vidca.bvs | 576x256 | BRGA | Main menu labels in Hebrew | [view](/images/vidca.png) |
| vssvc.nec | 576x256 | BRGA | Main menu labels in Malay | [view](/images/vssvc.png) |
| wshrm.nec | 217x37 | BGRA | "Yes" and "No" text, with "Yes" selected; used when being asked if you want to overwrite a save-game slot | [view](/images/wshrm.png) |
| xajkg.hsp | 640x480 | RGB565 Little Endian | Game Boy main menu background | [view](/images/xajkg.png) |

### Images (Unused)
To the best of my knowledge, the following image files are currently __unused__ by the `20230420` firmware, and were probably left over from previous devices (the SF2000 shares a bit of lineage with some USB-stick devices) or development. The images marked "Alternate UI" below appear to have been for a UI where the systems were scrolled through horizontally, and the "shortcut" games for each system were scrolled vertically.

| Filename | Resolution | Format | Description | View |
| -------- | ---------- | ------ | ----------- | ---- |
| aeinv.bke | 640x480 | RGB565 Little Endian | Alternate UI: Genesis/Mega Drive main menu background | [view](/images/unused/aeinv.png) |
| aepic.ers | 640x480 | RGB565 Little Endian | Alternate UI: User main menu background | [view](/images/unused/aepic.png) |
| c1e.pal | 640x480 | RGB565 Little Endian | CPS2 game-list background | [view](/images/unused/c1e.png) |
| cca.bvs | 640x480 | RGB565 Little Endian | In-game menu (position 1; Chinese language hardcoded) | [view](/images/unused/cca.png) |
| dectMap.key | 640x480 | RGB565 Little Endian | Button test screen (active) | [view](/images/unused/dectMap.png) |
| desk.cpl | 640x480 | RGB565 Little Endian | Eight-game selection screen | [view](/images/unused/desk.png) |
| djoin.hsp | 640x480 | RGB565 Little Endian | Alternate UI: Arcade main menu background | [view](/images/unused/djoin.png) |
| fcont.ctp | 640x480 | RGB565 Little Endian | Alternate UI: User main menu background | [view](/images/unused/fcont.png) |
| fdbil.ph | 1100x120 | BGRA | Large icons for each system, including systems not supported by the SF2000 (selected) | [view](/images/unused/fdbil.png) |
| gpapi.bvs | 640x480 | RGB565 Little Endian | In-game menu (position 5; looks like it was for some kind of button layout changing UI) | [view](/images/unused/gpapi.png) |
| ihds.bke | 640x480 | RGB565 Little Endian | Genesis/Mega Drive game-list background, with baked-in thumbnail placeholder | [view](/images/unused/ihds.png) |
| kdill.hsp | 640x480 | RGB565 Little Endian | Alternate UI: Game Boy Advance main menu background | [view](/images/unused/kdill.png) |
| logilda.be | 40x24 | BGRA | CPS1 game-list indicator | [view](/images/unused/logilda.png) |
| mfc64.emc | 40x24 | BGRA | CPS2 game-list indicator | [view](/images/unused/mfc64.png) |
| mfpmp.ers | 640x480 | RGB565 Little Endian | Alternate UI: Arcade main menu background | [view](/images/unused/mfpmp.png) |
| mrtac.klo | 40x24 | BGRA | Neogeo game-list indicator | [view](/images/unused/mrtac.png) |
| msdtc.bke | 640x480 | RGB565 Little Endian | Alternate UI: Game Boy Advance main menu background | [view](/images/unused/msdtc.png) |
| mswbv.cpl | 640x480 | RGB565 Little Endian | Alternate UI: Game Boy Advance main menu background | [view](/images/unused/mswbv.png) |
| nettrace.dll | 40x24 | BGRA | Unknown game-list indicator (grey joystick with yellow buttons) | [view](/images/unused/nettrace.png) |
| nsibm.ctp | 640x480 | RGB565 Little Endian | Alternate UI: Arcade main menu background | [view](/images/unused/nsibm.png) |
| nvinf.hsp | 16x240 | BGRA | Latin numbers 0 to 9 listed vertically | [view](/images/unused/nvinf.png) |
| nvinfohsp | 640x480 | RGB565 Little Endian | Alternate UI: Genesis/Mega Drive main menu background (note: there's no extension separator for this file, I suspect the file name is typo'd in the filesystem!) | [view](/images/unused/nvinfohsp.png) |
| pcadm.hsp | 640x480 | RGB565 Little Endian | Alternate UI: User main menu background (NTSC TV system selected) | [view](/images/unused/pcadm.png) |
| plasy.ers | 640x480 | RGB565 Little Endian | Alternate UI: Game Boy Advance main menu background | [view](/images/unused/plasy.png) |
| rmapi.cpl | 640x480 | RGB565 Little Endian | Alternate UI: User main menu background (English UI language selected) | [view](/images/unused/rmapi.png) |
| seltMap.key | 640x480 | RGB565 Little Endian | Button test screen | [view](/images/unused/seltMap.png) |
| spmpm.gdp | 640x480 | RGB565 Little Endian | Alternate UI: NES game-list background, with baked-in thumbnail placeholder | [view](/images/unused/spmpm.png) |
| subst.bke | 640x480 | RGB565 Little Endian | Alternate UI: Arcade main menu background | [view](/images/unused/subst.png) |
| tsmcf.cpl | 640x480 | RGB565 Little Endian | Alternate UI: Arcade main menu background | [view](/images/unused/tsmcf.png) |
| url.bvs | 640x480 | RGB565 Little Endian | CPS1 game-list background | [view](/images/unused/url.png) |
| werui.ioc | 320x240 | RGB565 Little Endian | "NODATA" save-state thumbnail placeholder image, with a "horror" style typeface | [view](/images/unused/werui.png) |
| wshom.ocx | 1100x120 | BGRA | Large icons for each system, including systems not supported by the SF2000 (normal) | [view](/images/unused/wshom.png) |
| x86e.hgp | 640x480 | RGB565 Little Endian | Neogeo game-list background | [view](/images/unused/x86e.png) |

### Other Files
These are other files that have been identified, which don't fit into the other categories. Non-Latin characters in the files are encoded in UTF-8.

| Filename | Description |
| -------- | ----------- |
| Archive.sys | Stores the settings for UI language and TV system. Two 32-bit words (4-bytes), little endian. The first is UI language; `0x00000000` is English, `0x01000000` is Chinese, etc.. The second is the TV system setting; `0x00000000` is NTSC, `0x01000000` is PAL |
| bfrjd.odb | UI strings in Korean |
| bxvtb.sby | UI strings in Thai |
| dufdr.cwr | UI strings in Turkish |
| eknjo.ofd | UI strings in Spanish |
| fhshl.skb | UI strings in English |
| Foldername.ini | Used to control menu rotation for the main menu (this information came from the 4PDA forum) |
| jsnno.uby | UI strings in Dutch |
| kcbn7.avc | Duplicate copy of `bisrv.asd`, the main firmware for the device which is found in the BIOS folder  |
| lf9lb.cut | UI strings in Portuguese |
| ntrcq.oba | UI strings in Japanese |
| ouenj.dut | UI strings in Polish |
| qdbec.ofd | UI strings in Italian |
| sgotd.cwt | UI strings in French |
| snbqj.uby | UI strings in German |
| t2act.sgf | UI strings in Chinese |
| Test.zsf | A SNES ROM, which displays a controller test program |
| tvctu.uby | UI strings in Russian |
| vdaz5.bjk | UI strings in Arabic |
| wtrxj.lbd | UI strings in Malay |
| xjebd.clq | UI strings in Hebrew |

### ROM Lists
Credit for this section goes to `taizou#9644`, author of [Frog Tool](https://github.com/tzlion/frogtool). These files relate to the built-in game lists under each main system; the list of games is pulled from these files instead of being built at runtime - annoying, but presumably for performance reasons. It means if you want to change the list of built-in games (instead of using the User ROMs section), you have to edit these files - hence Frog Tool, you should really check it out.

| Files | Description |
| ----- | ----------- |
| mfpmp.bvs (Arcade), mgdel.bvs (Game Boy Color), nethn.bvs (NES), qdvd6.bvs (Game Boy), sppnp.bvs (Game Boy Advance), wmiui.bvs (Genesis/Mega Drive), xvb6c.bvs (SNES) | Pinyin translations of the English ROM names, used for Chinese language searching. Not all game names are translated |
| adsnt.nec (SNES), fhcfg.nec (NES), htuiw.nec (Game Boy Advance), msdtc.nec (Arcade), setxa.nec (Genesis/Mega Drive), umboa.nec (Game Boy), wjere.nec (Game Boy Color) | Chinese translations of the English ROM names, used to display the game lists when the UI language is set to Chinese. Not all game names are translated |
| mswb7.tax (Arcade), pnpui.tax (Game Boy Color), rdbui.tax (NES), scksp.tax (Genesis/Mega Drive), urefs.tax (SNES), vdsdc.tax (Game Boy), vfnet.tax (Game Boy Advance) | English ROM Names, used to display the game lists when the UI language is set to English |
| xfgle.hgp, xfgle.hgp.bak | The `xfgle.hgp` file contains the ROM "shortcuts" on the main menu for each game system. The `xfgle.hgp.bak` file appears to be a test version of this file that was not removed from the firmware before being sent to production |
| TSMFK.TAX | This is a ROM list file similar to the other `.tax` files, except it is built at run-time from the ROM files in the user roms folder. The file is regenerated each time the device boots |

### Sounds
There are several sound files in the `20230420` firmware, stored in raw signed 16-bit PCM format (mono, little-endian at 22050 Hz). The SF2000 seems to play the files back at an incorrect sample rate vs. the raw data; if you want to customise the background music, resample your audio to 21543 Hz, and then speed the audio up to 22050 Hz, using the resulting audio as the raw data (credit to `notv37#4200` in Discord for doing the math on that).

| Filename | Description | Listen |
| -------- | ----------- | ------ |
| c2fkec.pgt | "Popping" sound that is played when moving around the search keyboard | [listen](/sounds/c2fkec.mp3) |
| dpnet.dll | "Downwards Zap" sound, unknown usage | [listen](/sounds/dpnet.mp3) |
| dsreg.bvs | "Upwards Bleeping" sound, unknown usage | [listen](/sounds/dsreg.mp3) |
| help.lis | "Double Buzzer" sound, unknown usage | [listen](/sounds/help.mp3) |
| mfsvr.nkf | "Beep" sound that is played when entering a letter on the search keyboard | [listen](/sounds/mfsvr.mp3) |
| nyquest.gdb | "Whooshing" sound that is played when switching between emulated systems on the main menu, between the "Resume", "Quit", "Load" and "Save" options on the in-game menu, and scrolling by pages within a system's game-list | [listen](/sounds/nyquest.mp3) |
| oldversion.kbe | "Three Note Upward Chime" sound that is played when deleting a letter on the search keyboard | [listen](/sounds/oldversion.mp3) |
| pagefile.sys | Main menu background music. If you don't like background music, and would rather just have silence, you can [find a replacement silent `pagefile.sys` here](/sounds/silentMusic/pagefile.sys) - just replace the one in the `Resources` folder (don't forget to backup the original file first, in case you ever want that jaunty tune again!) | [listen](/sounds/pagefile.mp3) |
| swapfile.sys | "Squishy" sound played when navigating horizontally through "shortcut" games on the main menu, or vertically within a system's game-list | [listen](/sounds/swapfile.mp3) |

### Unknown Files
These are files that I have not yet determined what they do; if anyone has any information on these, do post about it in the Data Frog channel in the Retro Handhelds Discord server please!

| Filename | Description |
| -------- | ----------- |
| kcnuv.lit | UNKNOWN; a bunch of 4-byte binary chunks (e.g., `0xC4 0x00 0x00 0x00`), followed by a list of .NES ROM file names. Very similar to the `.bvs`/`.nec`/`.tax` files detailed above, but doesn't have the same type of "header" they have |

---

## Version History
20230513 - 1.8: Discovered two "unused" images (the yes/no buttons) are indeed actually used, when being asked if you want to overwrite a saved game.

20230512 - 1.7: Added a note about stock battery runtime. Added a section with information about A/V output performance. Added a bit of info about PAL/NTSC region speed for Genesis/Mega Drive. Retitled the "bisrv.asd" section to make it clearer that's the BIOS/firmware. 

20230511 - 1.6: Added a quick note about the display panel to the Hardware section, and added a new section for Emulators, including an incredible collection of ROM notes for Arcade thanks to `adcockm#8175`! Also added a "silent" background music file for download, and a table of contents (this page is getting fairly long 😅). Added a `favicon.ico` to get rid of that one annoying console error.

20230510 - 1.5: Added additional detail to the Hardware section about the buttons, d-pad, thumb-stick, battery, and wireless controller support.

20230510 - 1.4: Added my own version of `osaka#9664`'s button mapping tool at their request, and changed the link in the Key Mapping section accordingly.

20230509 - 1.3: Added more details about how the boot logo ends up scaled on the screen, as well as a link to a new tool I wrote for altering the logo. Corrected one small formatting error.

20230508 - 1.2: Added details for `Archive.sys` - thanks to `osaka#9664` for the hints on what it related to!

20230507 - 1.1: Some "unknown" files from the `Resources` folder identified with `taizou#9644`'s help (thanks!); moved them to the Sounds and Rom Lists sections with details. Only two files left!

20230507 - 1.0: Original creation of this page.
