---
layout: page
order: 1
permalink: /hgap/
description: Humanoid Control with a Generalist Planner
title: Humanoid Control with a Generalist Planner
exclude: true
---

<style>
header{
    display:none;
}
footer{
	display: none;
}
.image-left {
      display: block;
      margin-left: auto;
      margin-right: 20px;
      float: left;
      height: 290px;
    }

body {
  color: #000000;
 /* font-family: 'Computer Modern Serif','Droid Sans', Helvetica, Arial, sans-serif;*/
  font-weight: normal;
  font-size: 1.125rem;
  position: relative;
  background-color: #FFFFFF;
  /*max-width: 100%;*/
  content-width: 100%;
  /*line-height: 1.2;*/
}

.content-container {
	content-width: 100%;
	padding: 1.5rem 1.5rem;
}

.inline {
    display: inline-block;
}

.caption {
    width: 200px;
    text-align: center;
}

</style>




<h1 align="center">
H-GAP: Humanoid Control with <br>a Generalist Planner
</h1>

<h5 align="center">
<div class="inline">Zhengyao Jiang<sup>*</sup><br>(UCL)</div>&nbsp;&nbsp;&nbsp; 
<div class="inline">Yingchen Xu<sup>*</sup><br>(UCL, FAIR at Meta)</div>&nbsp;&nbsp;&nbsp; 
<div class="inline">Nolan Wagener<br>(Georgia Tech)</div>&nbsp;&nbsp;&nbsp;  
<div class="inline">Yicheng Luo<br>(UCL)</div>&nbsp;&nbsp;&nbsp;  
<div class="inline">Michael Janner<br>(UC Berkeley)</div>&nbsp;&nbsp;&nbsp;

<br>
 <div class="inline">Edward Grefenstette<br>(UCL)</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
<div class="inline">Tim Rocktäschel<br>(UCL)</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
<div class="inline">Yuandong Tian<br>(FAIR at Meta)</div>
</h5>

<!-- <h6 align="center">
    <sup>*</sup>Equal Contribution
</h6> -->

<h5 align="center">
	<strong>:sparkles: ICLR 2024 Spotlight :sparkles:</strong>
</h5>

<center>
	<a href="https://arxiv.org/abs/2312.02682">[Paper]</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                
<a href="https://github.com/facebookresearch/hgap">[Code]</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="/images/h_gap_better_54_x_36_iclr.png"> [Poster]</a>
<a href="https://twitter.com/YingchenX/status/1732429478129762610"> [Twitter]</a>
</center>

<p align="center">
<video width="700" height="400" controls="" loop="" autoplay="" muted="">
  <source src="/videos/hgap_teaser_v4.mp4" type="video/mp4" >
</video>
</p>

<!-- <h2 align="center">
Abstract
</h2> -->

We present Humanoid Generalist Autoencoding Planner (H-GAP), a state-action trajectory generative model trained on humanoid trajectories derived from human motion-captured data, capable of adeptly handling downstream control tasks with Model Predictive Control (MPC).
For 56 degrees of freedom humanoid, we empirically demonstrate that H-GAP learns to represent and generate a wide range of motor behaviours. Further, without any learning from online interactions, it can also flexibly transfer these behaviors to solve novel downstream control tasks via planning. Notably, H-GAP excels established MPC baselines that have access to the ground truth dynamics model, and is superior or comparable to offline RL methods trained for individual tasks.
Finally, we do a series of empirical studies on the scaling properties of H-GAP, showing the potential for performance gains via additional data but not computing.

---

<h3 align="center">
H-GAP Overview
</h3>

<p align="center">
<img src="/images/hgap.jpg" alt="hgap"/>
</p>

**Left:** A VQ-VAE that discretizes continuous state-action trajectories. 

**Middle:** A Transformer that autoregressively models the prior distribution over latent codes,
conditioned on the initial state. 

**Right:** Zero-shot adapation to novel tasks via MPC planning with
learned Prior Transformer, underscoring H-GAP’s versatility as a generalist model.

---

<h3 align="center">
Imitation Learning
</h3>

We train H-GAP on MoCapAct dataset, which contains over 500k rollouts displaying various motion from the CMU MoCap dataset. 
Starting from the same state, H-GAP with greedy decoding can recover the various behaviours from the reference clips. Note that action noise is added to the final output of H-GAP, so the imitation can't be achieved by just memorisation.


<h5 align="center">
<div class="inline">
    <div class="caption">Walking <br>(CMU-002-01)</div>
    <img src ="/gifs/walking_im.gif" height="210" width="230">
</div>
<div class="inline">
    <div class="caption">Backwards<br>CMU-041-02)</div>
    <img src ="/gifs/backward_im.gif" height="210" width="230" >
</div>
<div class="inline">
    <div class="caption">Long Jumping <br>(CMU-013-11)</div>
    <img src ="/gifs/long_jumping_im.gif" height="210" width="230" >
</div>

<br>
<div class="inline">
    <div class="caption">Jumping Jack <br>(CMU-014-06)</div>
    <img src ="/gifs/jumping_jack_im.gif" height="210" width="230">
</div>
<div class="inline">
    <div class="caption">Cart Wheeling <br>(CMU-049-07)</div>
    <img src ="/gifs/cartwheeling.gif" height="210" width="230">
</div>
<div class="inline">
    <div class="caption">Turning <br>(CMU-010-04)</div>
    <img src ="/gifs/turning_im.gif" height="210" width="230">
</div>
</h5>

The reference snippets are short, but H-GAP with greedy decoding can continue the behaviours after reference snippets, sometimes forming a closed loop.

<h5 align="center">
<div class="inline">
    <div class="caption">Turning</div>
    <img src ="/gifs/turning_long.gif" height="210" width="230">
</div>
<div class="inline">
    <div class="caption">Raise hand</div>
    <img src ="/gifs/raise_hand_long.gif" height="210" width="230">
</div>
<div class="inline">
    <div class="caption">Shifting</div>
    <img src ="/gifs/shift_long.gif" height="210" width="230">
</div>
</h5>

---

<h3 align="center">
Downstream Control
</h3>
To test H-GAP’s zero-shot control performance as a generalist model, we design a suite of six control tasks: speed, forward, backward, shift left, rotate and jump. H-GAP matches or beats offline RL methods trained individually for each task. It also outperforms MPC with access to true dynamics, showing benefits of learned action space. 
<p align="center">
<img src="/images/downstream_performance.jpg" alt="downstream" height=400px/>
</p>

H-GAP with MPC planning can achieve sensible performance on a wide range of downstream tasks in a zero-shot fashion. Starting from an initial state that is irrelevant or contradictory to the objective, the agent will have to figure out a proper transition between motor skills. For example, it may start with a forward motion when the task is to move backwards. 

<h5 align="center">
<div class="inline">
    <img src ="/gifs/speed_1.gif" height="230" width="230">
</div>
<div class="inline">
    <div class="caption">Speed</div>
    <img src ="/gifs/speed_2.gif" height="230" width="230">
</div>
<div class="inline">
    <img src ="/gifs/speed_3.gif" height="230" width="230">
</div>

<br>
<br>
<div class="inline">
    <img src ="/gifs/rotate_y_1.gif" height="230" width="230">
</div>
<div class="inline">
    <div class="caption">Rotate</div>
    <img src ="/gifs/rotate_y_2.gif" height="230" width="230">
</div>
<div class="inline">
    <img src ="/gifs/rotate_y_3.gif" height="230" width="230">
</div>

<br>
<br>
<div class="inline">
    <img src ="/gifs/jump_1.gif" height="230" width="230">
</div>
<div class="inline">
    <div class="caption">Jump</div>
    <img src ="/gifs/jump_2.gif" height="230" width="230">
</div>
<div class="inline">
    <img src ="/gifs/jump_3.gif" height="230" width="230">
</div>

<br>
<br>
<div class="inline">
    <img src ="/gifs/forward_1.gif" height="230" width="230">
</div>
<div class="inline">
    <div class="caption">Forward</div>
    <img src ="/gifs/forward_2.gif" height="230" width="230">
</div>
<div class="inline">
    <img src ="/gifs/forward_3.gif" height="230" width="230">
</div>

<br>
<br>
<div class="inline">
    <img src ="/gifs/shift_1.gif" height="230" width="230">
</div>
<div class="inline">
    <div class="caption">Shift Left</div>
    <img src ="/gifs/shift_2.gif" height="230" width="230">
</div>
<div class="inline">
    <img src ="/gifs/shift_3.gif" height="230" width="230">
</div>

<br>
<br>
<div class="inline">
    <img src ="/gifs/backward_1.gif" height="230" width="230">
</div>
<div class="inline">
    <div class="caption">Backwards</div>
    <img src ="/gifs/backward_2.gif" height="230" width="230">
</div>
<div class="inline">
    <img src ="/gifs/backward_3.gif" height="230" width="230">
</div>
</h5>

---


