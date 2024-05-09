# Hide Names on Discord — for Browser
![GitHub License](https://img.shields.io/github/license/Tom-M-Git/hide_names_on_discord_for_browser)
![GitHub Release](https://img.shields.io/github/v/release/Tom-M-Git/hide_names_on_discord_for_browser)


This is a Chrome extension used on Discord to hide/censor user names with asterisks (`*`) except for names speficied, while displaying the first few letters and adding a number unique to each different name to the end. It is only available on **the browser version** of Discord.

Especially useful for screen recording on Discord when other people's privacy is concerned.

Hidden names e.g. `NameOnDiscord`, will look like this: `Na***********(1286)`.

- [Hide Names on Discord — for Browser](#hide-names-on-discord--for-browser)
	- [Main features](#main-features)
	- [Limitation](#limitation)
	- [License](#license)
	- [Credit](#credit)

## Main features
- Hiding user names on Discord server, including:
  - a memberlist
  - audience in a live/voice channel
  - a chat timeline, replys/mentions (except for channel names)
  - (who)'s *typing* below the input box.
- Hide with asterisks
- Display the first `1`(for CJK characters)/`2`(for alphanumeric) characters and hide the others
- Unique ID numbers so that names starting with the same 1 or 2 letters are distinguishable.

When specified names to display, all other user names are going to be censored with asterisks `*`.
A unique sequence of numbers is added to the end of each name. The same name will always have the name number.

## Limitation
There are limitations:

1. If the original name looks like this: `Na*******(1)`, (i.e. starting with 1 or 2 letters followed by asterisks then numbers in parenthesis and nothing after that),
the name is not going to be censored but displayed as-is.
The logic is simple: It first checks if the original name matches a specific string pattern. If matches, ignores, if not, porceeds to modification.

2. Also, if the original name is **exactly the same as another**, their ID numbers are going to be exactly the same. Because simply it generates a unique number by calculating the sum of ASCII code of each letter. The unique number is intended to make names starting with the same letters, distinguishable, but if the names are entirely the same all along, the number becomes meaningless.

## License
`GPL-3.0`<br>
Licensed under GNU General Public License v3.0.

## Credit
Morioka, Tomoaki. 2024.