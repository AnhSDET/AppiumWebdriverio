#TO BE CONTINUE

This document contains the TESTING PROCESS for better **`COLLABORATION`** within the team, **`CONVENTION`** that we should follow, **`BEST PRACTICES`** after researched and applied to project
#Quick Links
***



#**PROCESS**

I. COLLABORATION
---

In order to be successful in the collaboration between dev team (support to write test cases if availability) and tester, the following process should be carried out
- Business logic of the test cases should be stored in one central placeholder that is Jira/SynapseRT
- Team should access to the Automation Suite in the SynapseRT provided by Anh for specific project
- Team self-delegate tasks with the test cases with label "tobeAutomated"
- Team clarifies and consult @Anh if any concerns/questions e.g. Test feasibility=No
- Team starts to develop test cases tasks, after Done, assign to Anh to verify and mark label as "Automated"
- Team starts to do REFACTOR codes if necessarily in term of **`TIME SCOPE`** and **`CONVENTION`** or **`BEST PRACTICES`** (For instance: Screen objects or Test Specs or Configuration)


II. FEASIBILITY ANALYSIS
--- 
@Anh should prepare the test cases ready for automation which has the label as **"tobeAutomated"** and continuously add more to the test automation suite 
Depending on the Projects and complexity of test cases, Automation test suites can be divided to

- SMOKE TEST SUITE
- REGRESSION TEST SUITE

Here is how @Anh/Team analyse the test cases



| TC ID     | TC description            | All controls/steps can be automated   | Required test data available or preconditions supplied to create required data |Feasible/not feasible|
| ----------|-------------------------- | -----                                 |-----|---|
| HAN-279   | should do something       | Yes                                   |Yes|Feasible|
| HAN-      | should not do something   | Yes                                   |Yes|Feasible|
| HAN-      | should do something       | Yes                                   |Yes|Feasible|
***
### **CONVENTION**
- Making Your Own Set of Methods (Wrapping Selenium Calls) in the Screen Object in order to follow the OOP concept (Encapsulation,Inheritance,Abstraction) and best practices - refer to below

***
### **BEST PRACTICES**
- [Making Your Own Set of Methods - Wrapping Selenium Calls](https://blog.testproject.io/2017/04/16/test-automation-best-practices/)

//We would need to develop various  functions that represent the repeatable steps that can later be reused in other test cases.


