# Data Frog SF2000
Information regarding the SF2000 handheld console

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

As far as I am aware, all of the below images are actively used by the `20230420` version of the firmware; happy to take any corrections if it turns out any of them are unused!

| Filename | Format | Description |
| -------- | ------ | ----------- |
| aepic.nec | 576x256 BGRA | Main menu labels in Korean |
| apisa.dlk | 640x480 RGB | Arcade game list background |
| appvc.ikb | 150x214 BRGA | Game art placeholder |
| awusa.tax | 576x256 BRGA | Main menu labels in Thai |
| bisrv.nec | 640x480 RGB | In-game menu (position 3) |
| bttlve.kbp | 60x144 BGRA | Battery level indicator icons |
| c1eac.pal | 640x480 RGB | SNES game-list background |
| cero.phl | 640x480 RGB | Game Boy Color game-list background |
| certlm.msa | 40x24 BGRA | NES game-list indicator |
| d2d1.hgp | 640x480 RGB | In-game menu (position 2) |
| dism.csf | 640x480 RGB | In-game menu (position 1) |
| djctq.rsd | 40x24 BGRA | SNES game-list indicator |
| djoin.nec | 576x256 BRGA | Main menu labels in Spanish |
| dpskc.ctp | 640x320 RGB | In-game menu save-state slots (positions 1, 2, 3 and 4) |
| drivr.ers | 640x480 RGB | SNES main menu background |
| dsuei.cpl | 640x480 RGB | User ROMs main menu background |
| dxdiag.bin | 40x24 BGRA | Genesis/Mega Drive game-list indicator |
| dxkgi.ctp | 576x256 BRGA | Main menu labels in English |
| dxva2.nec | 640x480 RGB | Search keyboard (pressed) |
| ectte.bke | 161x126 BRGA | Main menu icon selection box |
| efsui.stc | 640x480 RGB | Game Boy Advance game-list background |
| esent.bvs | 576x256 BRGA | Main menu labels in Turkish |
| exaxz.hsp | 152x1224 BRGA | Main menu "Games Exist" and "Start: Open" labels for all languages |
| fixas.ctp | 640x480 RGB | NES main menu background |
| fltmc.sta | 640x480 RGB | Game Boy game-list background |
| fvecpl.ai | 40x24 BGRA | Game Boy game-list indicator |
| gpsvc.bvs | 392x80 RGB | In-game menu save-state slot (position 3) |
| hctml.ers | 640x480 RGB | Arcade main menu background |
| hgcpl.cke | 392x80 RGB | In-game menu save-state slot (position 2) |
| hlink.bvs | 640x480 RGB | Search keyboard (hover) |
| htui.kcc | 40x24 BGRA | Game Boy Color game-list indicator |
| icm32.dll | 40x24 BGRA | Game Boy Advance game-list indicator |
| icuin.cpl | 640x480 RGB | Genesis/Mega Drive main menu background |
| ihdsf.bke | 640x480 RGB | Genesis/Mega Drive game-list background |
| irftp.ctp | 640x480 RGB | Game Boy Advance main menu background |
| irmon.tax | 576x256 BRGA | Main menu labels in Dutch |
| itiss.ers | 576x256 BRGA | Main menu labels in Chinese |
| jccatm.kbp | 640x480 RGB | "Battery Empty" screen |
| ke89a.bvs | 576x256 BRGA | Main menu labels in Portuguese |
| ksxbar.ax | 392x80 RGB | In-game menu save-state slot (position 4) |
| lfsvc.dll | 640x480 RGB | Search game-list background |
| mksh.rcv | 640x480 RGB | Search keyboard (normal) |
| msdmo.gdb | 392x80 RGB | In-game menu save-state slot (position 1) |
| msgsm.dll | 40x24 BGRA | Arcade game-list indicator |
| mssvp.nec | 576x256 BRGA | Main menu labels in Japanese |
| normidna.bin | 40x24 BGRA | Search game-list indicator |
| ntdll.bvs | 576x256 BRGA | Main menu labels in Polish |
| pcadm.nec | 576x256 BRGA | Main menu labels in Italian |
| pwsso.occ | 640x480 RGB | In-game menu (position 4) |
| qasf.bel | 640x480 RGB | User game-list background |
| qwave.bke | 640x480 RGB | Game Boy Color main menu background |
| rmapi.tax | 576x256 BRGA | Main menu labels in German |
| sdclt.occ | 120x2280 RGB | TV system and UI language selection icons |
| sebsc.bvs | 576x256 BRGA | Main menu labels in French |
| sfcdr.cpl | 576x1344 BRGA | Main menu system logos |
| subst.tax | 576x256 BRGA | Main menu labels in Russian |
| ucby4.aax | 576x256 BRGA | Main menu labels in Arabic |
| urlkp.bvs | 640x480 RGB | NES game-list background |
| vidca.bvs | 576x256 BRGA | Main menu labels in Hebrew |
| vssvc.nec | 576x256 BRGA | Main menu labels in Malay |
| xajkg.hsp | 640x480 RGB | Game Boy main menu background |

### Images (Unused)

To the best of my knowledge, the following image files are currently __unused__ by the `20230420` firmware, and were probably left over from previous devices (the SF2000 shares a bit of lineage with some USB-stick devices) or development. The images marked "Alternate UI" below appear to have been for a UI where the systems were scrolled through horizontally, and the "shortcut" games for each system were scrolled vertically.

| Filename | Format | Description |
| -------- | ------ | ----------- |
| aeinv.bke | 640x480 RGB | Alternate UI: Genesis/Mega Drive main menu background |
| aepic.ers | 640x480 RGB | Alternate UI: User main menu background |
| c1e.pal | 640x480 RGB | CPS2 game-list background |
| cca.bvs | 640x480 RGB | In-game menu (position 1; Chinese language hardcoded) |
| dectMap.key | 640x480 RGB | Button test screen (active) |
| desk.cpl | 640x480 RGB | Eight-game selection screen |
| djoin.hsp | 640x480 RGB | Alternate UI: Arcade main menu background |
| fcont.ctp | 640x480 RGB | Alternate UI: User main menu background |
| fdbil.ph | 1100x120 BGRA | Large icons for each system, including systems not supported by the SF2000 (selected) |
| gpapi.bvs | 640x480 RGB | In-game menu (position 5; looks like it was for some kind of button layout changing UI) |
| igc64.dll | 217x37 BGRA | "Yes" and "No" text, with "No" selected |
| ihds.bke | 640x480 RGB | Genesis/Mega Drive game-list background, with baked-in thumbnail placeholder |
| kdill.hsp | 640x480 RGB | Alternate UI: Game Boy Advance main menu background |
| logilda.be | 40x24 BGRA | CPS1 game-list indicator |
| mfc64.emc | 40x24 BGRA | CPS2 game-list indicator |
| mfpmp.ers | 640x480 RGB | Alternate UI: Arcade main menu background |
| mrtac.klo | 40x24 BGRA | Neogeo game-list indicator |
| msdtc.bke | 640x480 RGB | Alternate UI: Game Boy Advance main menu background |
| mswbv.cpl | 640x480 RGB | Alternate UI: Game Boy Advance main menu background |
| nettrace.dll | 40x24 BGRA | Unknown game-list indicator (grey joystick with yellow buttons) |
| nsibm.ctp | 640x480 RGB | Alternate UI: Arcade main menu background |
| nvinf.hsp | 16x240 BGRA | Latin numbers 0 to 9 listed vertically |
| nvinfohsp | 640x480 RGB | Alternate UI: Genesis/Mega Drive main menu background (note: there's no extension separator for this file, I suspect the file name is typo'd in the filesystem!) |
| pcadm.hsp | 640x480 RGB | Alternate UI: User main menu background (NTSC TV system selected) |
| plasy.ers | 640x480 RGB | Alternate UI: Game Boy Advance main menu background |
| rmapi.cpl | 640x480 RGB | Alternate UI: User main menu background (English UI language selected) |
| seltMap.key | 640x480 RGB | Button test screen |
| spmpm.gdp | 640x480 RGB | Alternate UI: NES game-list background, with baked-in thumbnail placeholder |
| subst.bke | 640x480 RGB | Alternate UI: Arcade main menu background |
| tsmcf.cpl | 640x480 RGB | Alternate UI: Arcade main menu background |
| url.bvs | 640x480 RGB | CPS1 game-list background |
| werui.ioc | 40x24 RGB | "NODATA" save-state thumbnail placeholder image, with a "horror" style typeface |
| wshom.ocx | 1100x120 BGRA | Large icons for each system, including systems not supported by the SF2000 (normal) |
| wshrm.nec | 217x37 BGRA | "Yes" and "No" text, with "Yes" selected |
| x86e.hgp | 640x480 RGB | Neogeo game-list background |

### Other Files

These are other files that have been identified, which don't fit into the other categories. Non-Latin characters in the files are encoded in UTF-8.

| Filename | Description |
| -------- | ----------- |
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

Credit for this section goes to `taizou#9644`, author of [Frog Tool|https://github.com/tzlion/frogtool]. These files relate to the built-in game lists under each main system; the list of games is pulled from these files instead of being built at runtime - annoying, but presumably for performance reasons. It means if you want to change the list of built-in games (instead of using the User ROMs section), you have to edit these files - hence Frog Tool, you should really check it out.

| Files | Description |
| mfpmp.bvs (Arcade), mgdel.bvs (Game Boy Color), nethn.bvs (NES), qdvd6.bvs (Game Boy), sppnp.bvs (Game Boy Advance), wmiui.bvs (Genesis/Mega Drive), xvb6c.bvs (SNES) | Pinyin translations of the English ROM names, used for Chinese language searching. Not all game names are translated |
| adsnt.nec (SNES), fhcfg.nec (NES), htuiw.nec (Game Boy Advance), msdtc.nec (Arcade), setxa.nec (Genesis/Mega Drive), umboa.nec (Game Boy), wjere.nec (Game Boy Color) | Chinese translations of the English ROM names, used to display the game lists when the UI language is set to Chinese. Not all game names are translated |
| mswb7.tax (Arcade), pnpui.tax (Game Boy Color), rdbui.tax (NES), scksp.tax (Genesis/Mega Drive), urefs.tax (SNES), vdsdc.tax (Game Boy), vfnet.tax (Game Boy Advance) | English ROM Names, used to display the game lists when the UI language is set to English |
| xfgle.hgp, xfgle.hgp.bak | The `xfgle.hgp` file contains the ROM "shortcuts" on the main menu for each game system. The `xfgle.hgp.bak` file appears to be a test version of this file that was not removed from the firmware before being sent to production |

### Sounds

There are two sound files in the `20230420` firmware, both in raw signed 16-bit PCM format (little-endian, mono, at 22050 Hz). The SF2000 seems to play the files back at an incorrect sample rate vs. the raw data; if you want to customise the background music, resample your audio to 21543 Hz, and then speed the audio up to 22050 Hz, using the resulting audio as the raw data (credit to `notv37#4200` in Discord for doing the math on that).

| Filename | Description |
| -------- | ----------- |
| pagefile.sys | Main menu background music |
| swapfile.sys | Short "navigation" sound |

### Unknown Files

These are files that I have not yet determined what they do; if anyone has any information on these, do post about it in the Data Frog channel in the Retro Handhelds Discord server please!

| Filename | Description |
| -------- | ----------- |
| Archive.sys | UNKNOWN; 8 bytes, first are `0x02`, the rest are all `0x00` |
| c2fkec.pgt | UNKNOWN; binary |
| dpnet.dll | UNKNOWN; binary |
| dsreg.bvs | UNKNOWN; binary. __Not__ the same format as the `*.bvs` files mentioned in the "ROM Lists" section above |
| help.lis | UNKNOWN; binary |
| kcnuv.lit | UNKNOWN; a bunch of 4-byte binary chunks (e.g., `0xC4 0x00 0x00 0x00`), followed by a list of .NES ROM file names. Very similar to the `.bvs`/`.nec`/`.tax` files detailed above, but doesn't have the same type of "header" they have |
| mfsvr.nkf | UNKNOWN; binary |
| nyquest.gdb | UNKNOWN; binary |
| oldversion.kbe | UNKNOWN; binary |
| TSMFK.TAX | UNKNOWN; four bytes, all `0x00`. __Not__ the same format as the `*.tax` files mentioned in the "ROM Lists" section above |
