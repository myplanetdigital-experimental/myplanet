<?php

/**
 * @file
 * Theme template for a list of tweets.
 *
 * Available variables in the theme include:
 *
 * 1) An array of $tweets, where each tweet object has:
 *   $tweet->id
 *   $tweet->username
 *   $tweet->userphoto
 *   $tweet->text
 *   $tweet->timestamp
 *
 * 2) $twitkey string containing initial keyword.
 *
 * 3) $title
 *
 */
?>
<div class="tweets-pulled-listing">

  <?php if (is_array($tweets)): ?>
    <?php $tweet_count = count($tweets); ?>
    
    <ul class="tweets-pulled-listing">
    <?php foreach ($tweets as $tweet_key => $tweet): ?>
      <li>
	<div class="tweet-time"><?php print format_date($tweet->timestamp,'custom','j M Y');?></div>
    <span class="tweet-text"><?php print twitter_pull_add_links($tweet->text); ?></span>
      </li>
    <?php endforeach; ?>
    </ul>
  <?php endif; ?>
</div>
