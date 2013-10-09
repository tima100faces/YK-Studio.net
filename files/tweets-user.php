<?php
echo '<ul class="rslides-twitter">';

// Setting our Authentication Variables that we got after creating an application
// more info about script http://www.wpreads.com/2013/06/how-to-get-latest-tweets-with-twitter-api-1-1-in-wordpress.html
$settings = array(
    'oauth_access_token' => "", // required !
    'oauth_access_token_secret' => "", // required !
    'consumer_key' => "", // required !
    'consumer_secret' => "" // required !
);

// We are using GET Method to Fetch the latest tweets.
$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

// Set your screen_name to your twitter screen name. Also set the count to the number of tweets you want to be fetched. Here we are fetching 5 latest tweets.
$getfield = '?screen_name=ef1eden&count=5';
$requestMethod = 'GET';

// Making an object to access our library class
$twitter = new TwitterAPIExchange($settings);
$store = $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();
// Since the returned result is in json format, we need to decode it             
  $result = json_decode($store);

// After decoding, we have an standard object array, so we can print each tweet into a list item.
  $multi_array = objectToArray($result);
 foreach($multi_array as $key => $value ){

// printing each tweet wrapped in a <li> tag
 echo '<li><p class="time" title="'.$value["created_at"].'"></p><p class="twitter-text">'.$value["text"].'</p></li>';

 }
echo '</ul><nav class="rslides-navi navi-tweet"></nav>'; ?>