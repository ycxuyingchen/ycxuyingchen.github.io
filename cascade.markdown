---
layout: page
order: 1
permalink: /cascade/
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
</style>


<h1 align="center">
Learning General World Model in a Handful of Reward-free Deployments
</h1>

<h5 align="center">
Yingchen Xu*, Jack Parker-Holder*,  Aldo Pacchiano*,  Phillip J. Ball*,  Oleh Rybkin
<br>
Stephen J. Roberts, Tim Rocktäschel, Edward Grefenstette
</h5>

<h5 align="center">
	NeurIPS 2022
</h5>

<center>
	<a href="https://github.com/ycxuyingchen/cascade">[Paper]</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                
<a href="https://github.com/ycxuyingchen/cascade">[Code]</a>
</center>

<h2 align="center">
Abstract
</h2>

Building generally capable agents is a grand challenge for deep reinforcement learning (RL). To approach this challenge practically, we outline two key desiderata: 1) to facilitate generalization, exploration should be task agnostic; 2) to facilitate scalability, exploration policies should collect large quantities of data without costly centralized retraining. Combining these two properties, we introduce the reward-free deployment efficiency setting, a new paradigm for RL research. We then present CASCADE, a novel approach for self-supervised exploration in this new setting. CASCADE seeks to learn a world model by collecting data with a population of agents, using an information theoretic objective inspired by Bayesian Active Learning. CASCADE achieves this by specifically maximizing the diversity of trajectories sampled by the population through a novel cascading objective. We show a tabular version of CASCADE theoretically improves upon naïve approaches that do not account for population diversity. We then demonstrate that CASCADE collects diverse task-agnostic datasets and learns agents that generalize zero-shot to novel, unseen downstream tasks on Atari, MiniGrid and the DM Control Suite.

<p align="center">
<img src="/images/cascade_explanation_simplified.gif" alt="cascade"/>
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
Imagine that we want to learn a model of a room. Green areas represent high expected information gain . A population of independently trained agents will likely all follow the trajectory to #1 at deployment. 

To avoid collecting a homogenous dataset in such cases, CASCADE trains agents by taking into account the population diversity, in addition to  the information gain, and thus encourages an individual agent to sample states that maximally improve the world model.

---

<h3 align="center">
Data Diveristy
</h3>

Each row below visualizes data collected by a population of explorers trained by the **same** world model, deployed at the **same** time in the **same** environment. 

We can see that **CASCADE** explorers discover different parts of the world and display diverse nontrivial behaviors. On the contrary, **Plan2Explore** agents (trained without considering population diversity) collect only homogenous data. 

<h4 align="center">
Exploring Open-ended Worlds: Crafter
</h4>
**CASCADE**
<p align="center">
<img src="/images/cascade_crafter.gif" alt="cascade_crafter" height=100px/>
</p>
**Plan2Explore** (without population diversity)
<p align="center">
<img src="/images/pp2e_crafter.gif" alt="pp2e_crafter" height=100px/>
</p>

<h4 align="center">
Exploring Behaviors: Walker
</h4>
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
Finally, we test whether the learned world models are general enough to facilitate learning downstream policies for previously unknown tasks in a zero-shot fashion as follows: 
1. We provide reward labels to the world model; 
2. We train a separate reward head; 
3. We train a task specific behavior policy and test it in the environment. 

<h3 align="center">
Walker
</h3>
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
<p align="center">
<img src="/images/crafter_skill_breakdown.jpg" alt="crafter_task_breakdown" height=200px/>
</p>


