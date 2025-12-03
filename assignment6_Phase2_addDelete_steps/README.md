# Assignment Final: Garden Sequencer

## Week 13 Update: Interaction, Editable Steps and Flower Controls

Last week was mostly about getting Tone.js to act as a stable global clock.
This week I finally started building actual interaction, so the sequencer feels more like a tool and less like a visual demo.
The biggest changes are that flowers can now be edited, dragged, and deleted, and each petal can be turned on or off.

---

### Petal Editing (turning steps on and Off)

Last week the step patterns were random.
This week I added collision detection for petals so when I click a petal:

- the program figures out which petal is closest
- that step flips between active and inactive
- the visual changes immediately
- the next loop reflects the new rhythm
  So that users can actually shape their own patterns instead of relying on randomness.

---

### Click Behavior Depends on What I Touch

Inside the Flower class I added a function called checkClick.
It returns one of three results: touching the center, touching a petal, or touching nothing.

This made it possible to define clear behavior:

- left click on empty space plants a new flower
- left click on the flower center starts dragging
- left click on a petal toggles the step
- right click on the flower center deletes the flower

This gives the whole sequencer a clearer logic and makes it feel more like an instrument.

---

### Drag-to-Adjust Volume by Changing Stem Height

Flowers now have a root on the ground, a stem, and a head at the top.
When I drag the head up or down:

- the stem height changes
- the synth volume updates based on that height
- I mapped height to decibels, so tall flowers sound louder and short ones are quieter.
- I used rampTo instead of directly setting volume so the sound changes smoothly instead of clicking.

---

### Right Click Deletes a Flower

I disabled the browser’s default right-click menu so right click can be used for deletion.
This makes it easy to clean up flowers while experimenting and avoids accidental clutter.

---

### Adding a Grid Background

I added a light grid to the canvas.
It gives the whole garden a sense of scale and makes it feel more like a sequencer layout.
It also helps with understanding vertical movement when dragging flower stems.

---

### Redesigned Flower Structure

Flowers no longer float in the air.
Each one has:

- a root on the ground
- a stem with adjustable height
- a flower head positioned at the top
- petal shapes that rotate smoothly around the center
- RGB colors based on the note being used
  This version feels more physical and gives each flower a personality.

---

### Updated On-Screen Instructions

Since the interaction system got more complex, I updated the instructions drawn on the canvas.
These include how to plant flowers, toggle steps, drag them, and delete them.

---

### Sequencer Clock Remains the Same

The audio engine still uses Tone.Transport with scheduleRepeat set to sixteenth notes.
The timing stays stable and all flowers stay in sync, but now the patterns can be changed while the sequencer is running.

---

## Summary of Week 13

This week the sequencer became interactive.
The main achievements were:

- editable petals
- drag-to-volume control
- right-click deletion
- flowers with root–stem–head geometry
- pitch-based color palettes
- grid background for structure
- smarter click handling
  The project now feels like something that can be played rather than just watched.

### Next Steps

- try loading wav files so the system is not limited to synth notes
- think about a BPM control
- maybe build a simple UI panel for playback
- Continue exploring whether there are more visually appealing design directions.

# Week 12 Process: Using Tone.js and Set Up Global Clock

This week I focused on understanding how Tone.js works and whether it can serve as a stable global clock for a multi-track sequencer. I started by learning the signal flow of Tone.js and how the Transport timeline works, then applied what I learned to my prototype.

---

### How Tone.js Works (my understanding)

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

### Why I did not use millis()

In class we used `millis()` as the timing method.  
It works great for simple demos because you can check how much time has passed and approximate the beat from that.

But my project needs timing that stays stable.  
There are many flowers, each with its own pattern and its own sound.  
When several tracks play together, small timing errors become very noticeable.

`millis()` depends on the frame rate.  
If the browser slows down or the fps drops, the step timing drifts.  
With one sound this might be fine, but with multiple overlapping sounds the drift becomes obvious.

---

### Why I chose Tone.js for the global clock

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

### Musical Time Format in Tone.js

Tone.js uses the musical time format:

measures : beats : subdivisions

For example:

0:1:0 means measure 0, beat 1, subdivision 0 (the first sixteenth note).
Then 0:1:1 is the second one, 0:1:2 is the third, and 0:1:3 is the fourth.

In a 16-step sequencer, one step corresponds to one subdivision (usually a sixteenth note).  
So a 16-step loop equals one 4/4 measure.

---

### Why I did not use the official Tone.js stepSequencer example

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

### Why I used `Tone.Transport.scheduleRepeat`

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

### What a global step callback means

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

### Summary of this week

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
