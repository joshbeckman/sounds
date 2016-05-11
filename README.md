Sounds
===
Instead of staring at charts all day, waiting for numbers to change, why not listen for the difference? [Read more](http://www.andjosh.com/2015/02/17/analyzing-data-through-sound/).

### Steps
- Open the home page with any `id` as a query parameter
    - https://sounds.andjosh.com?id=foo
    - Keep it open 
    - This will produce lively tones
    - Anyone can listen with this URL
- Record data as sound by issuing a `GET` request to https://sounds.andjosh.com/record?id=foo

Other optional parameters:
- `tone`
    - Set to any floating number
- `msec`
    - Set to any integer for milliseconds of play for the tone
- `msg`
    - Set a display message on the listener page

### Pleasant Tone Groups
- `392`, `261.63`, `329.63`
- Communication from [Close Encounters of The Third Kind](http://www.ars-nova.com/Theory%20Q&A/Q35.html)
    - `293.66`, `329.63`, `261.63`, `130.81`, `196`

[Tone reference](http://www.phy.mtu.edu/~suits/notefreqs.html)

### Sites using Sounds
- [Narro](https://narro.co)
