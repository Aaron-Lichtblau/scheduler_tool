(this["webpackJsonplab-scheduler"]=this["webpackJsonplab-scheduler"]||[]).push([[0],{103:function(e,t,s){"use strict";s.r(t),t.default=s.p+"static/media/Aaron.dcd54bfb.png"},104:function(e,t,s){"use strict";s.r(t),t.default=s.p+"static/media/Matt.dcb89f1e.png"},105:function(e,t,s){"use strict";s.r(t),t.default=s.p+"static/media/Jeremie.c474951b.png"},109:function(e,t,s){"use strict";s.r(t);var a=s(1),i=(s(46),s(0)),n=s.n(i),c=s(16),r=s.n(c),l=(s(78),s(22)),h=s(23),o=s(9),d=s(25),j=s(24),b=s(19),u=s.n(b),x=s(121),O=s(123),p=s(126),f=s(114);s(39);function m(e){return Object(a.jsx)("div",{class:"col-xs-1",children:Object(a.jsx)(x.a.Row,{children:Object(a.jsxs)("li",{children:[Object(a.jsx)(x.a.Label,{children:e.slot}),Object(a.jsx)(x.a.Control,{required:!0,type:"number",min:"1",onChange:function(t){return e.onChange(e.slot,t.target.value)},defaultValue:e.value}),Object(a.jsx)(x.a.Control.Feedback,{type:"invalid",children:"Please provide a valid integer."})]})})})}var v=function(e){Object(d.a)(s,e);var t=Object(j.a)(s);function s(e){var a;return Object(l.a)(this,s),(a=t.call(this,e)).state={file:"",slotdict:{Mo_1900:0,Mo_2100:0,Tu_1900:0,Tu_2100:0,We_1900:0,We_2100:0,Th_1900:0,Th_2100:0,Fr_1900:0,Fr_2100:0,Sa_1500:0,Sa_1600:0,Sa_1700:0,Su_1700:0,Su_1800:0,Su_1900:0,Su_2000:0,Su_2100:0},hideSlots:!0,duration:120,validated:!1,hideSubmitButton:!0},a.handleFileChange=a.handleFileChange.bind(Object(o.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(o.a)(a)),a.handleSlotChange=a.handleSlotChange.bind(Object(o.a)(a)),a.handleDurationChange=a.handleDurationChange.bind(Object(o.a)(a)),a}return Object(h.a)(s,[{key:"handleSubmit",value:function(e){!1===e.currentTarget.checkValidity()&&(e.preventDefault(),e.stopPropagation(),console.log("invalid form")),this.setState({validated:!0});var t={slotdict:this.state.slotdict,duration:this.state.duration};u.a.post("/slotdict",t).then((function(e){console.warn(e)}))}},{key:"handleSlotChange",value:function(e,t){var s={};Object.assign(s,this.state.slotdict),s[e]=t,this.setState({slotdict:s})}},{key:"handleDurationChange",value:function(e,t){this.setState({duration:t})}},{key:"handleFileChange",value:function(e){var t=e.target.files[0];console.log(t),this.setState({file:t,hideSubmitButton:!1,hideSlots:!1}),this.fetchData(t),e.preventDefault()}},{key:"fetchData",value:function(e){var t=this,s=new FormData;s.append("file",e),u.a.post("/file",s).then((function(e){console.warn(e),u.a.get("/file/df").then((function(e){console.log(e.data.slotdict),t.setState({slotdict:e.data.slotdict,validated:!0})}),(function(e){t.setState({error:e})}))}))}},{key:"render",value:function(){var e=this,t=Object.keys(this.state.slotdict).map((function(t){return Object(a.jsx)("li",{children:Object(a.jsx)(m,{slot:t,onChange:e.handleSlotChange,value:e.state.slotdict[t]})},t)}));return Object(a.jsx)("div",{id:"fileForm",children:Object(a.jsx)(O.a,{defaultActiveKey:"0",children:Object(a.jsxs)(p.a,{children:[Object(a.jsx)(O.a.Collapse,{eventKey:"0",children:Object(a.jsxs)(p.a.Body,{children:[Object(a.jsx)(x.a.File,{id:"exampleFormControlFile1",label:"",width:"60",accept:".csv",onChange:this.handleFileChange}),Object(a.jsxs)(x.a,{noValidate:!0,validated:this.state.validated,onSubmit:this.handleSubmit,children:[Object(a.jsx)(m,{slot:"Slot Duration in Mins",onChange:this.handleDurationChange,value:this.state.duration}),Object(a.jsxs)("div",{hidden:this.state.hideSlots,children:["Select Number of TA's in each slot:",Object(a.jsxs)("ul",{children:[" ",t," "]})]})]})]})}),Object(a.jsx)(p.a.Footer,{children:Object(a.jsx)(O.a.Toggle,{as:f.a,type:"submit",onClick:this.handleSubmit,disabled:this.state.hideSubmitButton,eventKey:"0",children:"Submit Part 1"})})]})})})}}]),s}(n.a.Component),g=s(125),S=s(119),y=s(115);function w(e){return Object(a.jsxs)(g.a,{id:"popover-basic",children:[Object(a.jsxs)(g.a.Title,{as:"h3",children:[e," Information"]}),Object(a.jsx)(g.a.Content,{children:{"Average happiness / 100 ":"Let s(i,j) = score student i gave to shift j. Let cap(i) = student i's cap value. Each students' happiness is calculated as the sum of s(i,j) for the shifts they received / cap(i) * 3. This captures that a student would have happiness '100' if they received their cap number of shifts which they rated as '3', and crudely measures their happiness as < 100 if they don't. Average Happiness is reported as average happiness over all students.","Standard deviation of students' happiness / 100 ":"This score is the standard deviation of the students' happiness scores","Unhappy student outliers ":"Students who were treated especially poorly will be listed here.","Correlation of students' availability to happiness in [-1, 1] ":"Shows how well a student's availability given predicts their happiness (on -1 to 1 scale).","Correlation of students' skill to happiness in [-1, 1] ":"Shows how well a student's skill predicts their happiness (on -1 to 1 scale).","Correlation of students' experience to happiness in [-1, 1] ":"Shows how well a student's experience predicts their happiness (on -1 to 1 scale).","Students who got 1's ":"Any students who were scheduled at a time which they reported as a 1 are listed here.","Students without a shift ":"Any students who did not receive a shift are listed here.","Students who got the wrong type of shift (2hr vs. 4hr) ":"Any students who were scheduled in a shift that is not their desired type of shift are listed here."}[e]})]})}function k(e){var t={"avg hap":"Average happiness / 100 ","std dev of hap":"Standard deviation of students' happiness / 100","min hap stud outliers":"Unhappy student outliers ","avail to hap corr":"Correlation of students' availability to happiness in [-1, 1] ","skill to hap corr":"Correlation of students' skill to happiness in [-1, 1] ","experience to hap corr":"Correlation of students' experience to happiness in [-1, 1] ","studs who got 1s":"Students who got 1's ","studs without shift":"Students without a shift ","wrong shift type studs":"Students who got the wrong type of shift (2hr vs. 4hr) "},s=Object.keys(e.stats).map((function(s){return Object(a.jsxs)("tr",{children:[Object(a.jsxs)("th",{style:{color:"white"},children:[" ",t[s],Object(a.jsx)(S.a,{trigger:"click",placement:"right",overlay:w(t[s]),children:Object(a.jsx)(f.a,{variant:"warning",children:"i"})})]}),Object(a.jsxs)("td",{style:{color:"white"},children:[" ",e.stats[s].toString()," "]})]})}));return Object(a.jsxs)(y.a,{striped:!0,bordered:!0,hover:!0,responsive:"inline-flex",style:{backgroundColor:"#2F4550"},children:[Object(a.jsx)("thead",{}),Object(a.jsx)("tbody",{children:s})]})}function C(e){return e.values.map((function(e){return function(e){var t=null,s="white";"-1"===e&&(t="#D00000");"-2"===e&&(t="#FFD000",s="black");"-3"===e&&(t="#00A86B");return Object(a.jsxs)("td",{style:{color:s,backgroundColor:t},children:[" ",e," "]})}(e)}))}function _(e){var t=e.df;console.log(t),"Index"!==t[0][0]&&t[0].splice(0,0,"Index");var s=t[0];console.log(s);var i=t[1];console.log(i);var n=s.map((function(e){return Object(a.jsx)("th",{style:{color:"white"},children:Object(a.jsx)("div",{children:Object(a.jsx)("span",{children:e})})})}));console.log(n);var c=Object.keys(i).map((function(e){return Object(a.jsxs)("tr",{children:[Object(a.jsxs)("th",{style:{color:"white"},children:[" ",e," "]}),Object(a.jsx)(C,{values:i[e]})]})}));return Object(a.jsxs)(y.a,{striped:!0,hover:!0,responsive:"inline-flex",style:{backgroundColor:"#2F4550"},children:[Object(a.jsx)("thead",{children:Object(a.jsxs)("tr",{children:[" ",n]})}),Object(a.jsx)("tbody",{children:c})]})}s(72);var T=s(54),A=s(120),N=s(116),F=s(69);function Q(e){return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(x.a.Check,{inline:!0,label:e.value,type:"radio",id:"inline-radio",name:e.type,onClick:e.onClick,defaultChecked:e.defaultValue})})}var I=function(e){Object(d.a)(s,e);var t=Object(j.a)(s);function s(e){var a;return Object(l.a)(this,s),(a=t.call(this,e)).state={name:e.name,value:e.value,defaultValue:e.defaultValue},a}return Object(h.a)(s,[{key:"renderRadio",value:function(e,t){var s=this;return Object(a.jsx)(Q,{type:this.props.name,value:e,onClick:function(){return s.props.handleClick(s.props.name,e)},defaultValue:t})}},{key:"render",value:function(){var e=Array(5).fill(!1);return e[this.state.defaultValue-1]=!0,Object(a.jsxs)("div",{children:[this.renderRadio("1",e[0]),this.renderRadio("2",e[1]),this.renderRadio("3",e[2]),this.renderRadio("4",e[3]),this.renderRadio("5",e[4]),this.renderRadio("6",e[5])]})}}]),s}(n.a.Component),L=function(e){Object(d.a)(s,e);var t=Object(j.a)(s);function s(e){var a;return Object(l.a)(this,s),(a=t.call(this,e)).handleClick=a.handleClick.bind(Object(o.a)(a)),a.handleShow=a.handleShow.bind(Object(o.a)(a)),a.handleClose=a.handleClose.bind(Object(o.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(o.a)(a)),a.state={slots:e.slots,avail:4,slot_type:6,no_1:4,guarantee_shift:5,shift_cap:3,equality:2,show:!1},a}return Object(h.a)(s,[{key:"handleClick",value:function(e,t){this.setState(Object(T.a)({},e,t)),console.log(e+" updated to "+t)}},{key:"handleShow",value:function(){this.setState({show:!0})}},{key:"handleClose",value:function(){this.setState({show:!1})}},{key:"handleSubmit",value:function(){var e={weightdict:{avail:this.state.avail,slot_type:this.state.slot_type,no_1:this.state.no_1,guarantee_shift:this.state.guarantee_shift,shift_cap:this.state.shift_cap,equality:this.state.equality}};u.a.post("/basic",e).then((function(e){console.warn(e)})),this.setState({show:!1})}},{key:"renderQuestion",value:function(e,t){return Object(a.jsx)(I,{name:e,value:t,handleClick:this.handleClick,defaultValue:this.state[e]})}},{key:"render",value:function(){return Object(a.jsxs)("div",{className:"mb-3",children:[Object(a.jsx)(f.a,{variant:"primary",onClick:this.handleShow,children:"Select Basic Settings"}),Object(a.jsxs)(A.a,{size:"lg",show:this.state.show,onHide:this.handleClose,backdrop:"static",keyboard:!1,children:[Object(a.jsx)(A.a.Header,{closeButton:!0,children:Object(a.jsx)(A.a.Title,{children:"Basic Settings (defaults were settings used in 2019)"})}),Object(a.jsxs)(A.a.Body,{children:[Object(a.jsxs)(N.a,{children:[Object(a.jsx)(F.a,{xs:12,md:7,children:Object(a.jsx)("p",{className:"modalQues"})}),Object(a.jsx)(F.a,{xs:6,md:5,children:Object(a.jsx)("p",{className:"modalKey",children:" 1 = not important \xa0\xa0\xa0 6 = most important"})})]}),Object(a.jsxs)(N.a,{children:[Object(a.jsx)(F.a,{xs:12,md:7,children:Object(a.jsx)("p",{className:"modalQues",children:"It is essential that students who listed more availabilities get preference over students who listed fewer availabilities."})}),Object(a.jsx)(F.a,{xs:6,md:5,children:this.renderQuestion("avail",this.state.avail)})]}),Object(a.jsxs)(N.a,{children:[Object(a.jsx)(F.a,{xs:12,md:7,children:Object(a.jsx)("p",{className:"modalQues",children:"It is essential that students get their desired slot type (2hr vs 4hr)."})}),Object(a.jsx)(F.a,{xs:6,md:5,children:this.renderQuestion("slot_type",this.state.slot_type)})]}),Object(a.jsxs)(N.a,{children:[Object(a.jsx)(F.a,{xs:12,md:7,children:Object(a.jsx)("p",{className:"modalQues",children:"It is essential that no student gets placed in a slot that they reported as a 1 (can work at this time if I am absolutely needed to)."})}),Object(a.jsx)(F.a,{xs:6,md:5,children:this.renderQuestion("no_1",this.state.no_1)})]}),Object(a.jsxs)(N.a,{children:[Object(a.jsx)(F.a,{xs:12,md:7,children:Object(a.jsx)("p",{className:"modalQues",children:"It is essential that every student is guaranteed to get at least 1 shift."})}),Object(a.jsx)(F.a,{xs:6,md:5,children:this.renderQuestion("guarantee_shift",this.state.guarantee_shift)})]}),Object(a.jsxs)(N.a,{children:[Object(a.jsx)(F.a,{xs:12,md:7,children:Object(a.jsx)("p",{className:"modalQues",children:"Students who have higher caps on the number of shifts they want to work should be prioritized."})}),Object(a.jsx)(F.a,{xs:6,md:5,children:this.renderQuestion("shift_cap",this.state.shift_cap)})]}),Object(a.jsxs)(N.a,{children:[Object(a.jsx)(F.a,{xs:12,md:7,children:Object(a.jsx)("p",{className:"modalQues",children:"The number of shifts that each students gets should be distributed as evenly as possible."})}),Object(a.jsx)(F.a,{xs:6,md:5,children:this.renderQuestion("equality",this.state.equality)})]})]}),Object(a.jsx)(A.a.Footer,{children:Object(a.jsx)(f.a,{variant:"primary",onClick:this.handleSubmit,children:"Confirm"})})]})]})}}]),s}(n.a.Component);var B=s(117),R=s(70),D=s.n(R),P=function(e){Object(d.a)(s,e);var t=Object(j.a)(s);function s(e){var a;return Object(l.a)(this,s),(a=t.call(this,e)).handleClick=a.handleClick.bind(Object(o.a)(a)),a.handleShow=a.handleShow.bind(Object(o.a)(a)),a.handleClose=a.handleClose.bind(Object(o.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(o.a)(a)),a.getSlots=a.getSlots.bind(Object(o.a)(a)),a.state={min_exp:1,min_skill:2,stress_slots:[],target_delta:1,flex_shifts:3,slots:["dummy"],show:!1},a}return Object(h.a)(s,[{key:"getSlots",value:function(){var e=this;u.a.get("/slots").then((function(t){console.log(t.data),e.setState({slots:t.data,show:!0})}),(function(t){e.setState({error:t})}))}},{key:"handleClick",value:function(e,t){this.setState(Object(T.a)({},e,t)),console.log(e+" updated to "+t)}},{key:"handleShow",value:function(){this.getSlots()}},{key:"handleClose",value:function(){this.setState({show:!1})}},{key:"handleSubmit",value:function(){var e={min_exp:this.state.min_exp,min_skill:this.state.min_skill,stress_slots:this.state.stress_slots,target_delta:this.state.target_delta,flex_shifts:this.state.flex_shifts};u.a.post("/advanced",e).then((function(e){console.warn(e)})),this.setState({show:!1})}},{key:"renderQuestion",value:function(e){var t=this;return Object(a.jsx)(x.a.Control,{type:"number",min:"0",onChange:function(s){return t.handleClick(e,s.target.value)},defaultValue:this.state[e]})}},{key:"render",value:function(){return console.log(this.state.slots),Object(a.jsxs)("div",{className:"mb-3",children:[Object(a.jsx)(f.a,{variant:"primary",onClick:this.handleShow,children:"Select Advanced Settings"}),Object(a.jsxs)(A.a,{size:"lg",show:this.state.show,onHide:this.handleClose,backdrop:"static",keyboard:!1,children:[Object(a.jsx)(A.a.Header,{closeButton:!0,children:Object(a.jsx)(A.a.Title,{children:"Advanced Settings (defaults were settings used in 2019)"})}),Object(a.jsxs)(A.a.Body,{children:[Object(a.jsx)("h3",{children:"Adding Constraints"}),Object(a.jsx)("p",{className:"modalQues",children:"If there are certain slots which require more experienced or skilled TA's, select those slots in the 'stress slots' selection below. Then, select the minimum number of experienced and skilled TA's that you want to be guaranteed in each of these 'stress slots'."}),Object(a.jsxs)(N.a,{children:[Object(a.jsx)(F.a,{xs:12,md:8,children:Object(a.jsx)("p",{className:"modalQuesAdv",children:"STRESS SLOTS: slots which need especially strong TA's in them."})}),Object(a.jsx)(F.a,{xs:6,md:4,children:Object(a.jsx)(D.a,{options:this.state.slots,name:"stress_slots"})})]}),Object(a.jsxs)(N.a,{children:[Object(a.jsx)(F.a,{xs:12,md:8,children:Object(a.jsx)("p",{className:"modalQuesAdv",children:"MIN EXP: minimum number of 'experienced' TA's in each stress slot."})}),Object(a.jsx)(F.a,{xs:6,md:4,children:this.renderQuestion("min_exp")})]}),Object(a.jsxs)(N.a,{children:[Object(a.jsx)(F.a,{xs:12,md:8,children:Object(a.jsx)("p",{className:"modalQuesAdv",children:"MIN SKILL: minimum number of 'skilled' TA's in each stress slot."})}),Object(a.jsx)(F.a,{xs:6,md:4,children:this.renderQuestion("min_skill")})]}),Object(a.jsxs)("h3",{children:["Relaxing Constraints ",Object(a.jsx)(B.a,{variant:"warning",children:"Recommended"})]}),Object(a.jsx)("p",{className:"modalQues",children:"If the scheduler is over constrained, it can be infeasible to create a schedule. By increasing the parameters below, you relax the constraints to give the scheduler a better ability to perform optimally."}),Object(a.jsxs)(N.a,{children:[Object(a.jsx)(F.a,{xs:12,md:8,children:Object(a.jsx)("p",{className:"modalQuesAdv",children:"TARGET DELTA: this is the acceptable number of TA's above your inputted slot sizes that the scheduler can assign. For example, if: FR_1900 = 5 TA's and target delta = 2, the scheduler could assign up to 7 TA's in Fr_1900."})}),Object(a.jsx)(F.a,{xs:6,md:4,children:this.renderQuestion("target_delta")})]}),Object(a.jsxs)(N.a,{children:[Object(a.jsx)(F.a,{xs:12,md:8,children:Object(a.jsx)("p",{className:"modalQuesAdv",children:"FLEX SHIFTS: this is the number of floating shifts which the scheduler can assign in any slot. For example, if: flex shifts = 3, 3 extra shifts will be assigned throughout the schedule (within the target delta)."})}),Object(a.jsx)(F.a,{xs:6,md:4,children:this.renderQuestion("flex_shifts")})]})]}),Object(a.jsx)(A.a.Footer,{children:Object(a.jsx)(f.a,{variant:"primary",onClick:this.handleSubmit,children:"Confirm"})})]})]})}}]),s}(n.a.Component),M=s(118),V=function(e){Object(d.a)(i,e);var t=Object(j.a)(i);function i(e){var s;return Object(l.a)(this,i),(s=t.call(this,e)).handleSubmit=s.handleSubmit.bind(Object(o.a)(s)),s.resSection=n.a.createRef(),s.state={schedule:null,stats:{"to be displayed":"stat data"},df:[["headers"],{index:["row"]}],hideResults:!0,hideSpinner:!0,hideInfeasible:!0},s}return Object(h.a)(i,[{key:"scrollTo",value:function(e){e.current.scrollIntoView({behavior:"smooth",block:"start"})}},{key:"handleSubmit",value:function(){var e=this,t=this;t.setState({hideSpinner:!1}),u.a.get("/results").then((function(s){console.log(s.data);var a=s.data;t.setState({stats:a.stats,schedule:JSON.stringify(a.schedule),df:a.df,hideSpinner:!0}),a.stats["avg hap"]>100?(console.log("infeasible"),t.setState({hideInfeasible:!1,hideResults:!0})):t.setState({hideResults:!1,hideInfeasible:!0}),e.scrollTo(t.resSection)}),(function(e){t.setState({error:e})}))}},{key:"render",value:function(){var e={"border-color":"black"};return console.log(this.state.df),Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)("br",{}),Object(a.jsx)("br",{}),Object(a.jsxs)(M.a,{children:[Object(a.jsxs)(N.a,{children:[Object(a.jsx)(F.a,{sm:!0}),Object(a.jsx)(F.a,{md:"auto"}),Object(a.jsx)(F.a,{sm:!0})]}),Object(a.jsxs)(N.a,{children:[Object(a.jsxs)(F.a,{sm:5,children:[Object(a.jsx)("h3",{children:"Step 1: Upload time data"}),Object(a.jsxs)("p",{children:['Download your spreadsheet of labTA\'s time preferences as a .csv file. Then, upload your file by clicking "choose file". Make sure that your file is formatted correctly. To see an example file, refer to: \xa0',Object(a.jsx)("a",{href:"https://github.com/Aaron-Lichtblau/scheduler_tool/blob/main/api/default_input.csv",target:"_blank",rel:"noreferrer",children:"example csv"}),". Then input the duration of time slots (default is 2 hours). Lastly, input the desired number of TA's working in each slot."]})]}),Object(a.jsx)(F.a,{sm:7,children:Object(a.jsx)(v,{})})]}),Object(a.jsx)("br",{}),Object(a.jsx)("hr",{style:e}),Object(a.jsx)("br",{}),Object(a.jsxs)(N.a,{children:[Object(a.jsxs)(F.a,{sm:5,children:[Object(a.jsx)("h3",{children:"Step 2: Select Basic Settings"}),Object(a.jsx)("p",{children:"Fill in the questions to set the basic settings for the scheduler tool to use. The outputted schedule will be based on these preferences. Keep in mind that these preferences are competing. Scores of 4 and above will be treated as strict preferences: adhered to in all situations, unless there is a competing higher scored preference. Scores of 3 and below will be treated as soft preferences: adhered to as bonuses. Scores do not have to be unique."})]}),Object(a.jsx)(F.a,{sm:7,children:Object(a.jsx)(L,{})})]}),Object(a.jsx)("br",{}),Object(a.jsx)("hr",{style:e}),Object(a.jsx)("br",{}),Object(a.jsxs)(N.a,{children:[Object(a.jsxs)(F.a,{sm:5,children:[Object(a.jsx)("h3",{children:"Step 3: Select Advanced Settings (Optional)"}),Object(a.jsx)("p",{children:"Fill in the questions to set the advanced settings for the scheduler tool to use. The outputted schedule will be based on these preferences. This is a good place to adjust constraints on the scheduler."})]}),Object(a.jsx)(F.a,{sm:7,children:Object(a.jsx)(P,{})})]}),Object(a.jsx)("br",{}),Object(a.jsx)("hr",{style:e}),Object(a.jsx)("br",{}),Object(a.jsxs)(N.a,{children:[Object(a.jsx)(F.a,{}),Object(a.jsx)(F.a,{children:Object(a.jsxs)(f.a,{variant:"primary",onClick:this.handleSubmit,size:"lg",children:[Object(a.jsx)("img",{alt:"",src:s(67).default,width:"30",height:"30",className:"App-logo2",hidden:this.state.hideSpinner})," ","Create a Schedule!"]})}),Object(a.jsx)(F.a,{})]}),Object(a.jsx)("br",{}),Object(a.jsx)("br",{}),Object(a.jsx)("div",{className:"Infeasible",hidden:this.state.hideInfeasible,children:Object(a.jsx)("p",{children:" Something over-constrained the scheduler, please adjust settings "})}),Object(a.jsxs)("div",{className:"Results",hidden:this.state.hideResults,ref:this.resSection,children:[Object(a.jsxs)(N.a,{children:[Object(a.jsx)("h3",{children:" Your Schedule (slide right to view fully)"}),Object(a.jsx)("div",{class:"container horizontal-scrollable",children:Object(a.jsx)(_,{df:this.state.df})})]}),Object(a.jsx)("br",{}),Object(a.jsx)(N.a,{children:Object(a.jsx)("h3",{children:" Schedule Stats "})}),Object(a.jsx)("br",{}),Object(a.jsx)(N.a,{children:Object(a.jsx)(k,{stats:this.state.stats})}),Object(a.jsx)("br",{}),Object(a.jsxs)(N.a,{children:[Object(a.jsx)("h3",{children:" Print Out of Schedule "}),Object(a.jsxs)("p",{children:[" ",this.state.schedule]})]})]}),Object(a.jsx)("br",{}),Object(a.jsx)("hr",{style:e}),Object(a.jsx)("br",{}),Object(a.jsx)("div",{className:"footer",children:Object(a.jsxs)("p",{children:["Created by \xa0",Object(a.jsx)("a",{href:"https://github.com/Aaron-Lichtblau",target:"_blank",rel:"noreferrer",children:"Aaron Lichtblau"}),"\xa0 under the mentorship of \xa0",Object(a.jsx)("a",{href:"https://www.cs.princeton.edu/people/profile/lumbroso",target:"_blank",rel:"noreferrer",children:"Professor J\xe9r\xe9mie Lumbroso"}),"\xa0 and \xa0",Object(a.jsx)("a",{href:"https://www.cs.princeton.edu/people/profile/smattw",target:"_blank",rel:"noreferrer",children:"Professor Matt Weinberg"}),"."]})}),Object(a.jsx)("br",{}),Object(a.jsx)("br",{})]})]})}}]),i}(n.a.Component);var q=s(44),z=s(7),H=s(124),E=s(122),J=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,127)).then((function(t){var s=t.getCLS,a=t.getFID,i=t.getFCP,n=t.getLCP,c=t.getTTFB;s(e),a(e),i(e),n(e),c(e)}))};r.a.render(Object(a.jsx)(n.a.StrictMode,{children:Object(a.jsxs)(q.a,{children:[Object(a.jsx)("div",{className:"App",children:Object(a.jsxs)(H.a,{bg:"dark",variant:"dark",expand:"lg",children:[Object(a.jsxs)(H.a.Brand,{as:q.b,to:"/",children:[Object(a.jsx)("img",{src:s(67).default,alt:"Princeton",width:"30",height:"30",className:"d-inline-block align-top"})," ","Lab Scheduler"]}),Object(a.jsx)(H.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(a.jsxs)(H.a.Collapse,{id:"navbar",children:[Object(a.jsxs)(E.a,{className:"mr-auto",children:[Object(a.jsx)(E.a.Link,{as:q.b,to:"/",children:"Home"}),Object(a.jsx)(E.a.Link,{as:q.b,to:"/about",children:"About"})]}),Object(a.jsx)(x.a,{inline:!0,className:"welcomeText"})]})]})}),Object(a.jsx)("div",{children:Object(a.jsxs)(z.c,{children:[Object(a.jsx)(z.a,{exact:!0,path:"/",component:V}),Object(a.jsx)(z.a,{exact:!0,path:"/about",component:function(e){console.log("going to About page");var t=s(103),i=s(104),n=s(105),c={float:"center",width:"210px",height:"300px",margin:"auto",padding:"3px"};return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)("br",{}),Object(a.jsxs)(M.a,{children:[Object(a.jsxs)(N.a,{children:[Object(a.jsx)("h3",{children:" About the Lab Scheduler "}),Object(a.jsx)("br",{}),Object(a.jsx)("p",{children:"The Lab Scheduler was developed over the summer of 2020 in order to automate the schedule creation process for the Princeton Computer Science Department's peer-to-peer tutoring lab. The system utilizes a max-weight matching algorithm provided by the PuLP package to solve the schedule problem. Original preferences and specifications were developed with the help of Shirley Zhang '20 and Justin Chang '21."}),Object(a.jsx)("br",{})]}),Object(a.jsxs)(N.a,{children:[Object(a.jsx)(F.a,{sm:!0,children:Object(a.jsxs)(p.a,{style:{width:"20rem"},children:[Object(a.jsx)(p.a.Img,{variant:"top",src:t.default,style:c}),Object(a.jsxs)(p.a.Body,{children:[Object(a.jsx)(p.a.Title,{children:Object(a.jsx)("h2",{children:"Aaron Lichtblau"})}),Object(a.jsx)(p.a.Text,{children:Object(a.jsx)("h3",{className:"bio",children:"  Optimizer of Happiness "})})]})]})}),Object(a.jsx)(F.a,{sm:!0,children:Object(a.jsxs)(p.a,{style:{width:"20rem"},children:[Object(a.jsx)(p.a.Img,{variant:"top",src:i.default,style:c}),Object(a.jsxs)(p.a.Body,{children:[Object(a.jsx)(p.a.Title,{children:Object(a.jsx)("h2",{children:"Matt Weinberg"})}),Object(a.jsx)(p.a.Text,{children:Object(a.jsx)("h3",{className:"bio",children:" Master of Algorithms "})})]})]})}),Object(a.jsx)(F.a,{sm:!0,children:Object(a.jsxs)(p.a,{style:{width:"20rem"},children:[Object(a.jsx)(p.a.Img,{variant:"top",src:n.default}),Object(a.jsxs)(p.a.Body,{children:[Object(a.jsx)(p.a.Title,{children:Object(a.jsx)("h2",{children:"J\xe9r\xe9mie Lumbroso"})}),Object(a.jsx)(p.a.Text,{children:Object(a.jsx)("h3",{className:"bio",children:" Sage of Software "})})]})]})})]})]}),Object(a.jsx)("br",{}),Object(a.jsx)("br",{}),Object(a.jsx)("br",{}),Object(a.jsx)("br",{}),Object(a.jsx)("br",{}),Object(a.jsx)("br",{}),Object(a.jsx)("br",{})]})}}),Object(a.jsx)(z.a,{render:function(){return Object(a.jsx)("p",{children:"Not found"})}})]})})]})}),document.getElementById("root")),J()},46:function(e,t,s){},67:function(e,t,s){"use strict";s.r(t),t.default=s.p+"static/media/princeton.5fde0aef.png"},78:function(e,t,s){}},[[109,1,2]]]);
//# sourceMappingURL=main.2e9ec0a4.chunk.js.map