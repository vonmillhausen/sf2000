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
To the best of my knowledge, the following image files are currently __unused__ by the `20230420` firmware, and were probably left over from previous devices (the SF2000 shares a bit of lineage with some USB-stick devices) or development.

| Filename | Format | Description |
| -------- | ------ | ----------- |
| fdbil.ph | 1100x120 BGRA | Large icons for each system, including systems not supported by the SF2000 (selected) |
| igc64.dll | 217x37 BGRA | "Yes" and "No" text, with "No" selected |
| logilda.be | 40x24 BGRA | CPS1 game-list indicator |
| mfc64.emc | 40x24 BGRA | CPS2 game-list indicator |
| mrtac.klo | 40x24 BGRA | Neogeo game-list indicator |
| nettrace.dll | 40x24 BGRA | Unknown game-list indicator (grey joystick with yellow buttons) |
| nvinf.hsp | 16x240 BGRA | Latin numbers 0 to 9 listed vertically |
| werui.ioc | 40x24 RGB | "NODATA" save-state thumbnail placeholder image, with a "horror" style typeface |
| wshom.ocx | 1100x120 BGRA | Large icons for each system, including systems not supported by the SF2000 (normal) |
| wshrm.nec | 217x37 BGRA | "Yes" and "No" text, with "Yes" selected |

### Unknown Files
| Filename | Description |
| -------- | ----------- |
| Archive.sys | UNKNOWN; 8 bytes, first are `0x02`, the rest are all `0x00` |
| c2fkec.pgt | UNKNOWN; binary |
| dpnet.dll | UNKNOWN; binary |
| dsreg.bvs | UNKNOWN; binary |
| help.lis | UNKNOWN; binary |
| kcnuv.lit | UNKNOWN; a bunch of 4-byte binary chunks (e.g., `0xC4 0x00 0x00 0x00`), followed by a list of .NES ROM file names. Very similar to the `.bvs`/`.nec`/`.tax` files detailed above, but doesn't have the same type of "header" they have |
| mfsvr.nkf | UNKNOWN; binary |
| nyquest.gdb | UNKNOWN; binary |
| oldversion.kbe | UNKNOWN; binary |
| TSMFK.TAX | UNKNOWN; four bytes, all `0x00` |
