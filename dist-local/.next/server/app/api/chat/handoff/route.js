(()=>{var e={};e.id=675,e.ids=[675],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6487:()=>{},7701:(e,t,s)=>{"use strict";s.r(t),s.d(t,{patchFetch:()=>x,routeModule:()=>f,serverHooks:()=>y,workAsyncStorage:()=>v,workUnitAsyncStorage:()=>w});var o={};s.r(o),s.d(o,{POST:()=>d});var r=s(6559),n=s(8088),a=s(7719),i=s(2190);let c=process.env.STAFF_EMAIL||"support@vipercam.net",u=process.env.STAFF_PHONE||"(313) 800-3871",p=process.env.TWILIO_ACCOUNT_SID,m=process.env.TWILIO_AUTH_TOKEN,l=process.env.TWILIO_PHONE_NUMBER;async function d(e){try{let t=await e.json();if(!t.conversationId||!t.customerMessage)return i.NextResponse.json({success:!1,error:"Missing required fields"},{status:400});let s={conversationId:t.conversationId,customerMessage:t.customerMessage,customerEmail:t.customerEmail,customerName:t.customerName,timestamp:new Date().toISOString(),urgency:function(e,t){let s=e.toLowerCase();return["urgent","emergency","broken","not working","down","critical"].some(e=>s.includes(e))?"high":["help","issue","problem","trouble","need assistance"].some(e=>s.includes(e))?"medium":"low"}(t.customerMessage,t.reason)};return await Promise.allSettled([g(s),h(s)]),console.log(`Human handoff requested for conversation ${t.conversationId}:`,{reason:t.reason,customerMessage:t.customerMessage.substring(0,100)+"...",timestamp:s.timestamp}),i.NextResponse.json({success:!0,message:"Handoff request sent to support team",conversationId:t.conversationId,estimatedResponseTime:"5-10 minutes"})}catch(e){return console.error("Error processing handoff request:",e),i.NextResponse.json({success:!1,error:"Failed to process handoff request"},{status:500})}}async function g(e){try{let t=`
New Support Request from Website Chat

Conversation ID: ${e.conversationId}
Customer: ${e.customerName||"Anonymous"}
Email: ${e.customerEmail||"Not provided"}
Urgency: ${e.urgency.toUpperCase()}
Time: ${new Date(e.timestamp).toLocaleString()}

Customer Message:
${e.customerMessage}

To respond, please reply to this email with your message.
The response will be automatically sent to the customer's chat.

---
Vipercam Support Team
Phone: (313) 800-3871
Email: support@vipercam.net
    `.trim();console.log(`Email notification would be sent to ${c}:`,t)}catch(e){throw console.error("Failed to send email notification:",e),e}}async function h(e){try{if(!p||!m||!l){console.log("Twilio credentials not configured, skipping SMS notification");return}let t=`${{low:"\uD83D\uDFE2",medium:"\uD83D\uDFE1",high:"\uD83D\uDD34"}[e.urgency]} New support request from website chat

Customer: ${e.customerName||"Anonymous"}
Urgency: ${e.urgency.toUpperCase()}

Message: ${e.customerMessage.substring(0,100)}${e.customerMessage.length>100?"...":""}

Reply to this number to respond to the customer.`;console.log(`SMS notification would be sent to ${u}:`,t)}catch(e){throw console.error("Failed to send SMS notification:",e),e}}let f=new r.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/chat/handoff/route",pathname:"/api/chat/handoff",filename:"route",bundlePath:"app/api/chat/handoff/route"},resolvedPagePath:"G:\\My Downloads\\Vipercam Website\\app\\api\\chat\\handoff\\route.ts",nextConfigOutput:"",userland:o}),{workAsyncStorage:v,workUnitAsyncStorage:w,serverHooks:y}=f;function x(){return(0,a.patchFetch)({workAsyncStorage:v,workUnitAsyncStorage:w})}},8335:()=>{},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")}};var t=require("../../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),o=t.X(0,[447,580],()=>s(7701));module.exports=o})();