Digital Enlightenment
============================

# 1. Code

Build an app for an event that you must attend.

<!--<style>
	
	ol.optn > li{
		color:#535C5E;
	}

	ol.optn {
		list-style-type: lower-roman;

	}
	
	
	span.option_message{
		color:black;
		font-style: italic;
		font-weight:bold;
	}
	
</style>-->


#### FRONTEND

<ol>
	<li>Write html &amp css to flesh out your app. Your app should at least have a title, header, paragraph, form and slick background image. 
	</li>
</ol>

<hr>

<p><span class="option_message">Optional</span></p>

<ol class="optn">
	<li>Add <a href="https://getbootstrap.com/" target="_blank">boostrap</a> to your app. Explore the <a href="https://getbootstrap.com/components/" target="_blank">components</a> to decide which ones you want to incorporate.</li>
</ol>


#### BACKEND

<ol>
	<li>Connect the form to the check-in api. (<code>form.js</code>)</li>
</ol>
<hr>
<p><span class="option_message">Optional</span></p>

<ol class="optn">
	<li>Personalise the message that appears when the data is submitted to the api.</li>
	<li>Write an ajax request that tells you how many other people have attended the conference.</li>
</ol>


# 2. Data

Next we bring in the intelligence!

#### Data Collection

<ol>
	<li>Use <a href="https://twitter.com/settings/widgets" target="_blank">twitter</a> to add a twitter feed to your app (must be logged in). Create a new search widget.
	</li>
</ol>
<hr>
<p><span class="option_message">Optional</span></p>

<ol class="optn">
	<li>Restyle app as necessary</li>
</ol>


#### Data Analysis

<ol>
	<li>Copy <code>analysis.js</code> to your app. </li>
	<li>Modify to enable IBM Watson. </li>
	<li>Add button with trigger to call the sentiment analysis functionality</li>

</ol>
<hr>
<p><span class="option_message">Optional</span></p>

<ol class="optn">
	<li>Modify <code>getTweetText()</code> to remove hashtags.</li>
	<li>Translate any tweets that are not in English (log the translations to the console -- the asynchronicity will make it hard to actually replace existing text). Use the api of your choice, though you might want to go with <a href="https://tech.yandex.com/translate/" target="_blank">Yandex</a>.</li>
	<li>Detect any images in the tweets. If there are any, run sentiment analysis on the images using Project Oxford's API.</li>
	<li>Calculate how far away from the event the user is. For this, you will obviously need to select a location for where the event is taking place.</li>
</ol>
	

# 3. Hardware

Have an impact on the physical space of the conference. Trigger a hardware api at the click of a button. 

<ol>
	<li>Connect a new button that will triggers a physical device. You will need the code in <code>hardware.js</code></li>
</ol>

<hr>
<p><span class="option_message">Optional</span></p>

<ol class="optn">
	<li>Modify <code>hardware.js</code> so that a different tech api is triggered depending on an arbitrary condition of your choice. For example, you might want to make the screen blue if the average tweet sentiment is sad, or green if it's happy.</li>
	<li>Connect the uber api to your app. The api should tell you how long it would take for an uber to come pick you up.</li>
</ol>

