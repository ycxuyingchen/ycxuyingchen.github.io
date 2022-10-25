---
layout: page
order: 1
permalink: /cascade/
description: Learning General World Models in a Handful of Reward-free Deployments
title: Learning General World Models in a Handful of Reward-free Deployments
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

</style>




<h1 align="center">
Learning General World Models in a Handful of Reward-Free Deployments
</h1>

<h5 align="center">
<div class="inline">Yingchen Xu<sup>*</sup><br>(UCL, FAIR)</div>&nbsp;&nbsp;&nbsp; 
<div class="inline">Jack Parker-Holder<sup>*</sup><br>(Oxford)</div>&nbsp;&nbsp;&nbsp;  
<div class="inline">Aldo Pacchiano<sup>*</sup><br>(MSR)</div>&nbsp;&nbsp;&nbsp;  
<div class="inline">Phillip J. Ball<sup>*</sup><br>(Oxford)</div>&nbsp;&nbsp;&nbsp;
<div class="inline">Oleh Rybkin<br>(UPenn)</div>  
<br>

<div class="inline">Stephen J. Robertsbr<br>(Oxford)</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
<div class="inline">Tim Rocktäschel<br>(UCL)</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
<div class="inline">Edward Grefenstette<br>(UCL, Cohere)</div>
</h5>

<!-- <h6 align="center">
    <sup>*</sup>Equal Contribution
</h6> -->

<h5 align="center">
	<strong>NeurIPS 2022</strong>
</h5>

<center>
	<a href="https://arxiv.org/abs/2210.12719">[Paper]</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                
<a href="https://github.com/facebookresearch/cascade">[Code]</a>
</center>

<h2 align="center">
Abstract
</h2>

Building generally capable agents is a grand challenge for deep reinforcement learning (RL). To approach this challenge practically, we outline two key desiderata: 1) to facilitate generalization, exploration should be task agnostic; 2) to facilitate scalability, exploration policies should collect large quantities of data without costly centralized retraining. Combining these two properties, we introduce the reward-free deployment efficiency setting, a new paradigm for RL research. We then present CASCADE, a novel approach for self-supervised exploration in this new setting. CASCADE seeks to learn a world model by collecting data with a population of agents, using an information theoretic objective inspired by Bayesian Active Learning. CASCADE achieves this by specifically maximizing the diversity of trajectories sampled by the population through a novel cascading objective. We show a tabular version of CASCADE theoretically improves upon naïve approaches that do not account for population diversity. We then demonstrate that CASCADE collects diverse task-agnostic datasets and learns agents that generalize zero-shot to novel, unseen downstream tasks on Atari, MiniGrid and the DM Control Suite.

<p align="center">
<img src="/images/cascade_overview.jpg" alt="cascade"/>
</p>

---

<h3 align="center">
Reward-Free Deployment Efficiency
</h3>

**Goal**: Train generalist agents at scale.

- To make agents general, we want to collect reward-free data. This makes it possible to solve a wide variety of tasks which may have different reward functions.

- To make our methods scale, we want to collect data in parallel and update our policy infrequently. 

**Current methods**: Plan2Explore trains the exploration policy online, updating every timestep. It has generality but not scalability.

---

<h3 align="center">
<strong>C</strong>oordinated <strong>A</strong>ctive <strong>S</strong>ample <strong>C</strong>ollection vi<strong>a</strong> <strong>D</strong>iverse <strong>E</strong>xplorers
</h3>

<img align="left" src="/images/CASCADE_motivation.jpg" class="image-left"/>
Imagine that we want to learn a model of a room. <span style="color:green;font-weight: bold;">Green</span> areas represent high expected information gain. A population of independently trained agents will likely all follow the trajectory to #1 at deployment. 

To avoid collecting a homogenous dataset in such cases, CASCADE trains agents by taking into account the population diversity, in addition to  the information gain, and thus encourages each individual agent to sample states that maximally improve the world model.

---

<h3 align="center">
Data Diveristy
</h3>

Each row below visualizes data collected by a population of explorers trained by the **same** world model, deployed at the **same** time in the **same** environment. 

We can see that **CASCADE** explorers display much more diverse useful behaviors than **Plan2Explore** agents (trained without considering population diversity). 

<!-- <h4 align="center">
Exploring Open-Ended Worlds: Crafter
</h4>
**CASCADE**
<p align="center">
<img src="/images/cascade_crafter.gif" alt="cascade_crafter" height=100px/>
</p>
**Plan2Explore** (without population diversity)
<p align="center">
<img src="/images/pp2e_crafter.gif" alt="pp2e_crafter" height=100px/>
</p> -->

<!-- <h4 align="center">
Exploring Behaviors: Walker
</h4> -->
**CASCADE**
<p align="right">
<img src="/images/cascade_walker.gif" alt="cascade_walker" height=100px/>
</p>
**Plan2Explore** (without population diversity)
<p align="right">
<img src="/images/pp2e_walker.gif" alt="pp2e_walker" height=100px/>
</p>

---

<h3 align="center">
	Zero-shot Performance
</h3>
We test whether the learned world models are general enough to facilitate learning downstream policies for previously unknown tasks in a zero-shot fashion as follows: 
1. We provide reward labels to the world model; 
2. We train a separate reward head; 
3. We train a task specific behavior policy and test it in the environment. 

<h3 align="center">
Walker
</h3>
Aggregated over four unseen tasks (stand, walk, run, flip).
<p align="center">
<img src="/images/rliable_dmc_15_deployments_new.jpg" alt="walker_iqm" height=260px/>
</p>
<h3 align="center">
Atari & Crafter
</h3>
<p align="center">
<img src="/images/atari_all_crafter_iqm_2.jpg" alt="atari_crafter" height=260px/>
</p>
<h3 align="center">
Crafter Normalized Skill Success Rate
</h3>
Note that CASCADE not only achieves the highest average success rate but also unlocks the most (16 out of 22) unique skills among all baselines.
<p align="center">
<img src="/images/crafter_skill_breakdown.jpg" alt="crafter_task_breakdown" height=200px/>
</p>


