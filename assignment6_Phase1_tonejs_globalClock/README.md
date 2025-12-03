# Assignment Final: Garden Sequencer

## Week 12 Process: Using Tone.js and Set Up Global Clock

This week I focused on understanding how Tone.js works and whether it can serve as a stable global clock for a multi-track sequencer. I started by learning the signal flow of Tone.js and how the Transport timeline works, then applied what I learned to my prototype.

---

## How Tone.js Works (my understanding)

Tone.js is basically a music-friendly layer on top of the Web Audio API.  
It lets you think in terms of instruments, envelopes, timing, and sequences, instead of raw audio nodes.

The signal flow looks something like this:

1. **Core**  
   Provides the audio context and the global clock (Transport).  
   The Transport works like a DAW timeline and is important for anything rhythm-based.

2. **Source**  
   This is where raw sound comes from, such as oscillators, players, or samplers.

3. **Instrument**  
   An instrument wraps a source with envelopes and routing so it becomes playable.  
   Examples include Synth, PolySynth, AMSynth, etc.

4. **Effects / Components**  
   The sound can pass through delay, reverb, filters and other units to shape it.

5. **Destination**  
   The final output that goes to the speakers.

All timing and scheduling in Tone.js is done using the Transport.  
When you trigger a note, you are not asking it to play “right now” but telling the Transport to schedule it at an exact audio time.  
This is the part that makes Tone.js useful for sequencers.

---

## Why I did not use millis()

In class we used `millis()` as the timing method.  
It works great for simple demos because you can check how much time has passed and approximate the beat from that.

But my project needs timing that stays stable.  
There are many flowers, each with its own pattern and its own sound.  
When several tracks play together, small timing errors become very noticeable.

`millis()` depends on the frame rate.  
If the browser slows down or the fps drops, the step timing drifts.  
With one sound this might be fine, but with multiple overlapping sounds the drift becomes obvious.

---

## Why I chose Tone.js for the global clock

Tone.js uses the Web Audio clock, which is far more accurate than using frame-based timing.

`Tone.Transport` works like a DAW timeline. It gives me:

- a single global clock
- consistent musical timing
- precise scheduling
- the ability to change BPM smoothly
- timing that does not drift even when visuals get heavy

`scheduleRepeat("16n")` fires the callback exactly on each sixteenth note, based on audio time instead of frame rate.  
This makes it much more suitable for a multi-track sequencer.

---

## Musical Time Format in Tone.js

Tone.js uses the musical time format:

measures : beats : subdivisions

For example:

0:1:0 → measure 0, beat 1, subdivision index 0 (first sixteenth note)
0:1:1 → second sixteenth note
0:1:2 → third sixteenth note
0:1:3 → fourth sixteenth note

In a 16-step sequencer, one step corresponds to one subdivision (usually a sixteenth note).  
So a 16-step loop equals one 4/4 measure.

---

## Why I did not use the official Tone.js stepSequencer example

The official example is built with `Tone.Sequence`.  
It is great for grid-based sequencers or drum machines, but it does not fit this project.

Reasons:

- it leads to a typical drum-grid interface, not a flower visualization
- the track structure is fixed
- it mixes DOM UI with audio, which does not fit my p5.js canvas
- it is not convenient for dynamically adding and removing flowers
- multi-track management becomes more complex

So even though the example is helpful to study `Tone.Sequence`, it is not suitable for the “flower sequencer” structure.

---

## Why I used `Tone.Transport.scheduleRepeat`

My project is a multi-track system.  
Each flower has:

- its own `steps[]` pattern
- its own sound player
- its own visuals

I needed a way to broadcast a single, consistent clock tick to all flowers at the same time.

`scheduleRepeat()` gives me exactly that:

- one global callback for each step
- perfect alignment of all tracks
- accurate timing from the Web Audio clock
- dynamic addition and removal of flowers
- full flexibility in pattern length and structure

Compared to that:

- `Tone.Sequence` fits single-track fixed patterns
- `Tone.Loop` fits looping one track
- `scheduleRepeat` fits multi-track dynamic systems

So this method matched my project much better.

---

## What a global step callback means

A global step callback is a function triggered by `Tone.Transport` at each rhythmic interval.

On every step I:

- check each flower’s pattern
- trigger its sound if the current step is active
- trigger animations like petal pulses
- update the global step index (looping from 0 to 15)

Without a global callback:

- each flower would have to track time on its own
- timing would drift
- BPM changes would break sync
- animations would not line up

---

## Summary of this week

This week I mainly explored timing strategies for a multi-track sequencer.  
My conclusions:

- millis() is simple but drifts when FPS changes
- Tone.Transport provides stable musical timing
- scheduleRepeat() is ideal for coordinating many tracks
- Tone.Sequence is not suitable for dynamic flower-based structure
- the global step callback is the center of the whole system

Next steps:

- adding editable step patterns.
- Improving visual, interaction and animations.
- I also want to try using wav files as an alternative to the synth-based sounds, so the system can include more varied textures and sounds that are not necessarily pitch-based.
