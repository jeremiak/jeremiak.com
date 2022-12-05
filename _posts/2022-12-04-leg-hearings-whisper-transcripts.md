---
title: Senators, subtitles, and speech to text AI
description: Can we have better California legislative hearing transcripts thanks to some free AI tools?
---

The California Senate [provides audio and video recordings](https://www.senate.ca.gov/media-archive) of their hearings along with subtitles for the video, as required by law.

Cool. But how good are the subtitles?

Not great. Sure it can help you understand a bunch of what was said in a hearing but it's not even close to sufficient if you are deaf or heavily rely on closed captioning to follow along with the activity of your representative government.

In my view there are three major problems:

1. There are some minor spelling mistakes and some larger grammar mistakes that introduce confusion or at least distract.
2. And they're displayed in really short phrases of just a few words, which can make it difficult to follow complex thoughts in a legislative hearing.
3. Frustratingly, the captions are in all caps which makes reading difficult and makes it hard to spot commonly used acronyms.

Ok so they <strike>suck</strike> leave a lot to be desired. What can we do beyond manually typing out each hearing? I hate to bring it up but can a robot have this job? Can AI help here?

Frankly, I find the quality of contemporary artificial intelligence absolutely terrifying. But it's here and there's not much I can do about it. Maybe we can at least get better legislative hearing transcripts?

There's a class of tools called "speech to text" that take audio/video of human language and generate a text version. Duh. A company called OpenAI released a speech to text tool named [Whisper](https://openai.com/blog/whisper/) and it's been getting rave reviews across my Twitter/Mastodon feeds. The idea is that you give it a video and out comes the transcript. Seems perfect for this experiment!

So here's what we're gonna do: run a video of a hearing through Whisper and then see how the generated closed captioning compares to the set offered by the state.

I selected a recent California Senate hearing concerning an issue near and dear to my heart, the state's campaign finance disclosure system called [CAL-ACCESS](https://cal-access.sos.ca.gov/).

Some real quick background on the hearing:

* The system was originally deployed in 2000 and in 2017 the legislature passed a bill to build a replacement system called the "**C**AL-**A**CCESS **R**eplacement **S**ystem" or "CARS". Cars... yuck.
* So far the state's spent at least $30 million dollars and has almost nothing to show for it. Things were apparently so bad that current Secretary of State Weber [scraped the project and started over in June 2021](https://www.sos.ca.gov/campaign-lobbying/cal-access-replacement-system-project-cars-updates/CARS-news-and-updates).
* As of the hearing, CARS is not expected to be available to the public until at least 2026.
   
Hence, the oversight hearing - which [I attemped to live tweet](https://twitter.com/jeremiak/status/1597643021738471424).

Anyway, I fed the video to the robot and it generated captions. This part took _a long time_, like over 24 hours on my Intel chip Macbook Pro. In fact, at the time this post was first published only 1 hour and fifty four minutes had been transcribed of the 2 hour and 4 minute long hearing. I think that's enough to make the point.

And the result was surprising! Surprisingly good, that is. You can check it out for yourself below.

In fact please do because I'm not a person who regularly uses assistive technology so I'm unclear if these new captions will be better in all circumstances. If you do frequently use assistive technology I'd love to hear your take!

Here's the hearing, toggle back and forth between the closed captioning sources to see the difference:

<fieldset class="hide">
  <legend>Closed captioning source for the video</legend>
  <input type="radio" id="track-input-none" name="track-input" value="None" checked>
  <label for="track-input-none">None</label>
  <input type="radio" id="track-input-ca-gov" name="track-input" value="CA.gov">
  <label for="track-input-ca-gov">CA.gov</label>
  <input type="radio" id="track-input-whisper" name="track-input" value="Whisper">
  <label for="track-input-whisper">Whisper</label>
  <input type="radio" id="track-input-both" name="track-input" value="Both">
<label for="track-input-both">Both</label>
</fieldset>

<video id="hearing" controls preload="metadata">
  <source src="https://vod.senate.ca.gov/videos/2022/20221129_Elections.mp4" type="video/mp4">
  <track
    label="CA.gov"
    kind="subtitles"
    srclang="en"
    src="/data/ca-senate-hearing-transcript/20221129_Elections-ca-gov.vtt" />
  <track
    label="Whisper"
    kind="subtitles"
    srclang="en"
    src="/data/ca-senate-hearing-transcript/whisper.vtt" />
</video>

The main difference I see is that the whisper-generated captions are _much_ easier to read. They're not in all caps and instead of optimizing for a consistent number of words on the screen at once the new captions seem to be more sentence based. This makes following the back and forth of a hearing much easier.

Additionally, names, titles, and acronyms seem to be more accurately captured and are normally cased so it's nicer on the eyes.

It's not perfect but it's pretty good. And sometimes the mistakes inspire a chuckle or two. For example, an attorney for the Fair Political Practices Commission (the main campaign cash cop in California) gave testimony and the AI wrote the agency name as "Fair Political Praxis Commission".

I'm excited that we might be entering a period where cheap, reliable, high quality transcripts are the norm. That means more people can participate in monitoring government. It also means that we'll be able to more quickly search through audio or video sources in order to conduct research or fact check. Yay!

Do you have any experience working with speech to text tools? Are you a person who uses screen readers and other assistive tools and you have thoughts about the differences in the two captions? I'd love to hear about it! My email is on [the home page](/).

<style>
  fieldset {
    margin-bottom: 1rem;
  }

  fieldset.hide {
    display: none;
  }

  video {
    display: block;
    margin: 0 auto;
    max-width: 700px;
    width: 100%;
  }

  [type="radio"] {
    left: -9999px;
    position: absolute;
  }

  label {
    cursor: pointer;
    display: flex;
    padding: .25rem;
  }

  label:before {
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    content: ' ';
    display: inline-block;
    height: 1rem;
    margin-right: .5rem;
    width: 1rem;
  }

  [type="radio"]:checked + label:before {
    background-color: var(--border-color);
  }
</style>

<script>
  const form = document.querySelector('fieldset')
  const video = document.querySelector('video')
  const textTracks = video.textTracks
  const caGovTrack = textTracks[0]
  const whisperTrack = textTracks[1]

  form.classList.remove('hide')

  form.addEventListener('change', e => {
    const value = e.target.value.toLowerCase()

    if (value === 'none') {
      caGovTrack.mode = 'disabled'
      whisperTrack.mode = 'disabled'
    } else if (value === 'ca.gov') {
      caGovTrack.mode = 'showing'
      whisperTrack.mode = 'disabled'
    } else if (value === 'whisper') {
      caGovTrack.mode = 'disabled'
      whisperTrack.mode = 'showing'
    } else if (value === 'both') {
      caGovTrack.mode = 'showing'
      whisperTrack.mode = 'showing'
    }
  })
</script>