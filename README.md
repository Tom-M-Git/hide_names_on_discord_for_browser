# Hide Names on Discord — for Browser

This is a Chrome extension to hide/censor user names with asterisks (`*`) except for names speficied on *Discord*, while displaying the first few letters and adding a number unique to each different name to the end. It is only available on **the browser version** of Discord.

Especially useful for screen recording on Discord when other people's privacy is concerned.

## Main features
___
- Hiding user names on Discord server, including: a memberlist, audience in a live/voice channel, a chat timeline, replys/mentions (except for channel names), who's *typing* below the input box.
- Hide with asterisks
- Unique ID numbers so that names starting with the same 1 or 2 letters are distinguishable.

When specified names to display, all other user names are going to be censored with asterisks `*`.
A unique sequence of numbers is added to the end of each name. The same name will always have the name number.

## Limitation
___
There is a limitation:

1. If the original name is like this: `Na*******(1)`, (i.e. starting with 1 or 2 letters followed by asterisks then numbers in parenthesis and nothing after that),
the name is not going to be censored but displayed as-is.
The logic is simple: It first checks if the original name matches a specific string pattern. If matches, ignores, if not, porceeds to modification.

2. Also, if the original name is **exactly the same as another**, their ID numbers are going to be exactly the same. Because simply it generates a unique number by calculating the sum of ASCII code of each letter. The unique number is intended to make names starting with the same letters, distinguishable, but if the names are entirely the same all along, the number becomes meaningless.

## License
___
Licensed under

## Credit
___
Author: Tomoaki Morioka