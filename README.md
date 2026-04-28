Smart Resource Allocation System

Overview

The Smart Resource Allocation System is a rule-based disaster resource distribution prototype designed to improve transparency and efficiency during emergency response situations. The system addresses the problem of delayed and inconsistent manual allocation of disaster relief resources by using a structured scoring mechanism based on population impact and severity level.

The solution calculates a priority score for each affected region and proportionally distributes the available budget according to the urgency and scale of impact. The system also improves decision clarity through visual representations such as graphs, allocation tables, and regional mapping views.


---

Problem Statement

During disaster situations, relief resources are often limited and need to be distributed quickly across multiple affected regions. Traditional manual allocation methods may lead to:

Delayed decision-making

Unequal distribution of resources

Lack of transparency in prioritization

Human bias and inconsistency


This project aims to provide a transparent and reproducible allocation model that supports structured disaster response planning.


---

Objective

The objective of this project is to design a lightweight decision-support prototype that:

Prioritizes regions based on measurable impact factors

Allocates resources proportionally using data-driven logic

Improves clarity of decision-making through visual outputs

Demonstrates a scalable foundation for future intelligent allocation systems



---

Features

Rule-based allocation mechanism

Severity-level prioritization

Dynamic score computation

Proportional budget distribution

Interactive input and output interface

Graph-based visualization of allocations

Structured regional analysis display



---

Input Parameters

The system accepts the following inputs:

Parameter	Description

Region Name	Name of affected region
Population	Population affected in the region
Severity Level	Disaster impact category


Severity Mapping

Severity	Numerical Value

Low	1
Medium	2
High	3
Critical	4



---

Core Logic

Step 1: Score Calculation

Each region is assigned a priority score using:

Score = Population × Severity Level


---

Step 2: Total Score Computation

The total score is calculated by summing all regional scores.

Total Score = Sum of All Regional Scores


---

Step 3: Budget Allocation

The available budget is distributed proportionally:

Allocation = (Region Score / Total Score) × Total Available Budget

This ensures regions with higher impact and severity receive larger resource allocations.


---

Example Scenario

Total Available Budget: 100000

Region	Population	Severity	Score	Allocation

Region A	5000	Critical	20000	40000
Region B	3000	High	9000	18000
Region C	2000	Medium	4000	8000
Region D	4000	Low	4000	8000
Region E	3500	High	10500	21000



---

System Workflow

1. User enters regional disaster data.


2. Severity levels are mapped numerically.


3. Priority score is computed for each region.


4. Total score is calculated.


5. Budget allocation is generated proportionally.


6. Results are displayed using tables and visual graphs.




---

Visual Representation

The system improves decision clarity through:

Allocation graphs

Regional distribution charts

Structured output tables

Visual comparison of severity impact


These visual outputs help users quickly understand allocation patterns and resource priorities.


---

Technologies Used

HTML

CSS

JavaScript


Deployment:

GitHub Pages



---

Demo Video

This video demonstrates the working of the Smart Resource Allocation System, including input processing, scoring mechanism, and final budget allocation.

Demo Link: (https://drive.google.com/file/d/1Zea8Dls5yvL9w8OMWOjDrm9sten6rTvc/view?usp=drivesdk)


---

Prototype Link

(https://divyanshi-code5.github.io/My-Resource-Allocation-Project/)


---

Limitations

Uses a linear scoring mechanism

Depends on manually provided data

Does not include infrastructure damage analysis

No real-time API integration

No predictive AI or machine learning model integration



---

Future Scope

The system can be extended by:

Adding real-time disaster data integration

Including infrastructure and accessibility factors

Introducing weighted or nonlinear scoring models

Integrating predictive analytics using Google AI services such as Gemini API or Vertex AI

Expanding into a full-scale disaster management dashboard



---

Conclusion

The Smart Resource Allocation System demonstrates a transparent and structured approach to disaster resource distribution using rule-based scoring logic. The project focuses on clarity, fairness, and proportional allocation under constrained resource conditions while providing a scalable foundation for future intelligent decision-support systems.
