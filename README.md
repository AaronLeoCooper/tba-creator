# Text-Based Adventure Creator - Turn data into a TBA game!

Remember that classic game genre? The "Text-Based Adventure"? No? Oh, it's already 2019..

But anyway, for those of us who *do* recall those sessions staring at a plain terminal window,
considering which direction to take at the fork in the forest path, this is **your** chance to
create you very own Text-Based Adventure story/game/experience with ease!

## Usage

**TBA Creator** is a program that loads in files you create that tell the game everything from
the name and description of your game, the scenes that the player will encounter and the phrases
that the game will attempt to pick out from the user's input.

See the [Schema](#Schema) section for more complete information about what's possible.

The easiest way to get started is to use the `create-tba-game` tool to generate yourself a starter
game to work on top of.

```bash
# via NPM:
npx create-tba-game

# or via Yarn:
yarn create tba-game
```

The generator will prompt you with a series of questions to create a personalised starting point.
The choices made will affect the resulting configuration files, which you can change later anyway.

Once installed, change into the newly created directory (based on the name you entered during
setup) and start the game:

```bash
npm start
```

## Schema

TBA Creator works with the [TOML](https://github.com/toml-lang/toml) data format, chosen for
its quick and easy editing whilst being extremely readable as compared to other more commonly
used data formats. TBA Creator attempts to introduce as little friction as possible between your
creativity and your writing medium.

With this in mind, TBA Creator requires you to have three schema files for your game to operate:

- [main.toml](#main.toml)
- [dictionary.toml](#dictionary.toml)
- [story.toml](#story.toml)

If you created your game using the [create-tba-game](#Usage) program, you will already have a basic
set of all the required schema files ready to go. They just need your creative genius to turn them
into your ideal adventure game.

### main.toml

This is where you can configure global settings for your whole TBA game. Things like the name and
description of the game live here, as well as settings that will affect some of the workings of
the game as a whole.

Here's an example `main.toml` schema file with all of the available settings listed:

```toml
[description]
name = "Renny's Amazing Adventure"
about = """
Join Renny the sliding monkey as he goes about an
awesome adventure!
"""

[options.scene]
preDelayMs = 0 # Adds a delay in milliseconds before a new scene is displayed
postDelayMs = 0 # Adds a delay in milliseconds after a scene is displayed (before allowing input)

[options.input]
caseSensitive = false # Forces case-sensitivity when checking user input
quitPhrases = [ "quit" ] # Phrases that will close the program (whitespace is ignored)
unknownPhraseWarnings = [ # Displays a message randomly when the user enters an unknown phrase
  "Sorry, I don't understand.",
  "You're talking nonense!",
  "Huh?!"
]
```

### dictionary.toml

The dictionary is as it sounds: a listing of all the available words and phrases that your game
will understand and attempt to match against the user's typed instructions. The dictionary is
broken up into types of words/phrases, such as objects, directions or misc phrases.

You're completely free to create types that make sense for your story. For instance, I might be
writing an epic tale about the Jelly Baby empire being under siege by the terrifying Wine
Gums, so I may want a "jellyBaby" phrase type to categorise all the possible jelly colours.

Here's an example `dictionary.toml` schema file:

```toml
[[actions]]
name = "walk"
aka = [ "run", "hop", "skip" ]

[[actions]]
name = "run"
aka = [ "sprint", "dash" ]

[[actions]]
name = "take"
aka = [ "grab" ]

[[actions]]
name = "open"

[[directions]]
name = "north"

[[directions]]
name = "south"

[[objects]]
name = "blue door"
aka = [ "door" ]

[[objects]]
name = "green door"
aka = [ "door" ]

[[phrases]]
name = "yes"
aka = [ "y", "yup" ]

[[phrases]]
name = "no"
aka = [ "n", "nope" ]

# You can create any type of phrase you want, here's a "jellyBaby" type...
[[jellyBaby]]
name = "green"

[[jellyBaby]]
name = "red"
```

### story.toml

This is where your story will be defined! If you think about how a text-based adventure game or
a choose-your-own-adventure book plays out, you go from one scene to another scene in a linear
fashion, based on your interactions. Sometimes you may revisit scenes you encountered before,
or maybe just want to look a bit more carefully at something in a scene to get more information
about your surroundings. These are all possible in your story.

The story schema requires you to define individual scenes that can be encountered, specifying
any possible responses that the scene can give the user based on their actions. Scene responses
could take the story to another scene, or simply give the user a description relating to what
actions they entered.

If a scene is marked as an ending, once that scene is reached the game will end just after
displaying the scene description.

Here's an example `story.toml` schema:

```toml
[[scenes]]
  name = "1"
  description = """
You are standing in Renny's room, looking at the little monkey while he eats his banana.
He looks up and asks with his mouth full, "Want some of my banana?"
  """
  [[scenes.responses]]
    grammar = [ "phrases.yes" ]
    description = """
The little monkey smiles and replies with, "Weebuddee!!! I'm so happy that you also love bananas!"
"""
    nextScene = "happyBananaEnding"
  [[scenes.responses]]
    grammar = [ "phrases.no" ]
    description = """
The little monkey frowns and replies with, "Heebuddee! I should have known you weren't a true
banana lover..." 
    """
    nextScene = "sadBananaEnding"
  [[scenes.responses]]
    grammar = [ "phrases.maybe" ]
    description = """
The little monkey looks puzzled as he replies with, "Huh?? Come on, you must have an opinion!"
    """

[[scenes]]
  name = "sadBananaEnding"
  description = """
Renny takes one last pitiful look before turning his back on you. This is where your journey ends!
  """
  ending = true

[[scenes]]
  name = "happyBananaEnding"
  description = """
Renny's big grin is infectious and you can't help but plaster the same cheeky smile on your own
face too. He slides over to you and hands you his precious banana! THE END!
  """
  ending = true
```

## Platform Support

Currently support is only provided for the command line and has been tested in macOS and Windows.
However, support may be added in the future for running in the browser, opening up possibilities
like displaying graphics or having more fancy user interaction methods.

## About

TBA Creator was built using TypeScript for a bit of fun and exploration. I was heavily inspired
by some of the games of my youth like Zork and "Choose Your Own Adventure" books.
