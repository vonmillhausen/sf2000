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
| irmon.tax | 576x256 BRGA | Main menu labels in Dutch |
| ke89a.bvs | 576x256 BRGA | Main menu labels in Portuguese |
| mssvp.nec | 576x256 BRGA | Main menu labels in Japanese |
| ntdll.bvs | 576x256 BRGA | Main menu labels in Polish |
| pcadm.nec | 576x256 BRGA | Main menu labels in Italian |
| pwsso.occ | 640x480 RGB | In-game menu (position 4) |
| vidca.bvs | 576x256 BRGA | Main menu labels in Hebrew |
| vssvc.nec | 576x256 BRGA | Main menu labels in Malay |

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
