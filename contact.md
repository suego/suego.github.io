---
layout: default
title: Connect With Us
permalink: /contact/
---

<section class="hero-slider">
  <div class="flash-gallery-wrapper">
    <ul class="flash-gallery bx-slider">
      <li><img src="/assets/images/our-services.jpg" alt="group meeting" alt="About Us"/></li>
    </ul> 
  </div> 
</section>

<section class="content">
  <h1 class="page-title">{{ page.title }}</h1>
  <h2>Looking to get online? Let's chat.</h2>
  <p>We believe the Internet is the great equalizer for small business. You can build your brand and get exposure at a fraction of the cost compared to traditional advertising. Your focus is on growing your business, so we'll help put the right marketing pieces into place to make it happen.</p>
  <h3>Send us a message</h3>
  <p>Please enter your information and message in the fields below. We will not share your information without your permission.</p>
  <form id="contactform" method="POST">
    <input type="hidden" name="_next" value="https://suego.co/" />
    <p><input type="text" name="first" placeholder="First (Required)" required ></p>
    <p><input type="text" name="last" placeholder="Last (Required)" required ></p>
    <p><input type="email" name="_replyto" placeholder="Email (Required)" required ></p>
    <p><input type="text" name="phone" placeholder="Phone"></p>
    <input type="hidden" name="_subject" value="Website contact" />
    <p><textarea name="message" placeholder="Message (Required)" required ></textarea></p>
    <input type="text" name="_gotcha" style="display:none!important" />
    <input type="submit" class="sendit" value="Submit">
  </form>
  <script>
      var contactform =  document.getElementById('contactform');
      contactform.setAttribute('action', '//formspree.io/' + 'steven' + '@' + 'suego' + '.' + 'co');
  </script>
