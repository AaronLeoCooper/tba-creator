# Text-Based Adventure Creator - Turn data into a TBA game!

Remember that classic game genre? The "Text-Based Adventure"? If you were born after the
early nineties, maybe not.

But anyway, for those of us who *do* recall those sessions staring at a terminal-esque window,
considering which direction to take at the fork in the forest path, this is **your** chance to
create you very own Text-Based Adventure story/game/experience.

## Usage

TBA Creator was designed to operate as a command-line program that loads in your custom files,
called *Schema*. These Schema are what tell TBA Creator how you want your text-based adventure
to work. See the Schema section for more complete information about what's possible.

First, install the program either globally *or* locally:

```bash
# global
npm i -g tba-creator

# local
npm i tba-creator
```

Here's a simple usage example of the program that will start by loading
schema files located inside a `schema` directory:

```bash
tbac ./schema
```

> Tip: `tbac` is an alias for the full program name `tba-creator`. You can use either.

## Schema

TBA Creator works with the [TOML](https://github.com/toml-lang/toml) data format, chosen for
its quick and easy editing whilst being very readable. Other more common formats like JSON and
YAML were discounted very early on in development due to the hassles involved with creating
and updating them. For writing stories, there should be as little friction as possible between
your creativity and your writing medium.

You can make TBA Creator as easy or as complex as you want it to be. You may want to start by
having one big Schema that your entire story sits in and work your way up from there.

### main.toml

This is where you can configure globally-applied settings for your whole TBA. This is the file
that you need to point the `tba-creator` program at to start your TBA correctly.

Here's an example `main.toml` schema file:

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

This is where you will add any and all phrases that your text-based adventure will understand
from the user's input. Without this, your adventure will not last long! In fact, it won't even
be a functional adventure, because it won't know what to do when the user types anything.

Here's an example `dictionary.toml` schema file:

```toml
# Actions
[[actions]]
name = "walk"
aka = [ "walk", "run", "hop", "skip" ]

[[actions]]
name = "run"
aka = [ "run", "sprint", "dash" ]

[[actions]]
name = "take"
aka = [ "take", "grab" ]

[[actions]]
name = "open"

# Entities
[[entities]]
name = "north"

[[entities]]
name = "south"

[[entities]]
name = "blueDoor"
aka = [ "door", "blue door" ]

[[entities]]
name = "greenDoor"
aka = [ "door", "green door" ]

# Phrases
[[phrases]]
name = "yes"
aka = [ "yes", "y", "yup" ]

[[phrases]]
name = "no"
aka = [ "no", "n", "nope" ]

[[phrases]]
name = "maybe"
aka = [ "maybe", "umm", "?" ]
```

### story.toml

This is where your story will be defined! If you think about how a text-based adventure game or
a choose-your-own-adventure book plays out, you go from one scene to another scene in a linear
fashion, based on your interactions.

That's how the story schema flows as well, by requiring you to define individual scenes that will
be presented, as well as specifying scenes that can possibly come next, depending on the user's
actions.

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
    nextScene = "2-yes"
  [[scenes.responses]]
    grammar = [ "phrases.no" ]
    nextScene = "2-no"
  [[scenes.responses]]
    grammar = [ "phrases.maybe" ]
    nextScene = "2-maybe"

[[scenes]]
  name = "2-yes"
  description = """
The little monkey smiles and replies with, "Weebuddee!!! I'm so happy that you also love bananas!" 
  """
  nextScene = "happyBananaEnding"

[[scenes]]
  name = "2-no"
  description = """
The little monkey frowns and replies with, "Heebuddee! I should have known you weren't a true
banana lover..." 
  """
  nextScene = "sadBananaEnding"

[[scenes]]
  name = "2-maybe"
  description = """
The little monkey looks puzzled as he replies with, "Huh?? Come on, you must have an opinion!"
  """
  [[scenes.responses]]
    grammar = [ "phrases.yes" ]
    nextScene = "2-yes"
  [[scenes.responses]]
    grammar = [ "phrases.no" ]
    nextScene = "2-no"
  [[scenes.responses]]
    grammar = [ "phrases.maybe" ]
    nextScene = "2-maybe"

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

## Support

Currently support is only provided for the command line and has been tested in macOS and Windows.
However, depending on the success of this iteration, support may be added in the future for
running in the browser, opening up possibilities like displaying graphics or having fancy
input methods.

I/O handling was strictly decoupled from any core logic, so adding support for new interfaces
later should not be too difficult.

## About

TBA Creator was built using TypeScript for a bit of fun and exploration. I was heavily inspired
by some of the games of my youth like Zork and Choose Your Own Adventure books.
