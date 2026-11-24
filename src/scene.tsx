import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame,Easing} from 'remotion';
import {Olya,Kolya,Pose,mixPose,COLOR} from './rig';

const waiting:Pose={headTilt:0,torsoLean:0,face:'happy',phoneAngle:-24,
 left:{shoulder:[-58,-355],elbow:[-92,-293],wrist:[-82,-237]},
 right:{shoulder:[55,-354],elbow:[94,-315],wrist:[94,-284]}};
const showing:Pose={headTilt:13,torsoLean:7,face:'hopeful',phoneAngle:5,
 left:{shoulder:[-58,-355],elbow:[-82,-306],wrist:[-69,-255]},
 right:{shoulder:[55,-354],elbow:[111,-345],wrist:[185,-369]}};
const held:Pose={...showing,headTilt:10,face:'waiting'};
const lowered:Pose={headTilt:-8,torsoLean:-3,face:'hurt',phoneAngle:15,
 left:{shoulder:[-58,-355],elbow:[-83,-295],wrist:[-80,-237]},
 right:{shoulder:[55,-354],elbow:[90,-290],wrist:[78,-225]}};
const L=(a:number,b:number,t:number)=>a+(b-a)*t;
const smooth=(a:number,b:number,frame:number)=>interpolate(frame,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});

export const OlyaKolyaTest:React.FC=()=>{
 const f=useCurrentFrame();
 const p= f<12?waiting:f<41?mixPose(waiting,showing,smooth(12,41,f)):
 f<72?held:f<95?mixPose(held,lowered,smooth(72,95,f)):lowered;
 const kTurn= f<85?0:smooth(85,117,f)*.12;
 const bubbleOpacity=interpolate(f,[0,13,20,53,74],[0,0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <AbsoluteFill style={{backgroundColor:COLOR.cream,fontFamily:'Arial,sans-serif'}}>
 <svg viewBox="0 0 1080 1920" width="100%" height="100%">
   <rect width="1080" height="1920" fill={COLOR.cream}/>
   <rect y="0" width="1080" height="386" fill="#F8F1E5"/>
   <text x="540" y="160" fontSize="82" fontWeight="800" textAnchor="middle" fill={COLOR.ink}>ПОЧЕМУ В БРАКЕ</text>
   <rect x="114" y="205" width="852" height="119" rx="26" fill="#EAC4B1"/>
   <text x="540" y="286" fontSize="78" fontWeight="800" textAnchor="middle" fill={COLOR.ink}>СТАНОВИТСЯ ОДИНОКО?</text>
   <path d="M140 1040 Q540 980 940 1040 L940 1530 L140 1530 Z" fill="#C8D3C4" opacity=".45"/>
   <rect x="94" y="1370" width="895" height="188" rx="75" fill="#AFBFAF" stroke={COLOR.ink} strokeWidth="9"/>
   <rect x="178" y="1480" width="720" height="160" rx="42" fill="#BACBB9" stroke={COLOR.ink} strokeWidth="8"/>
   <path d="M0 1670 H1080" stroke="#B2BCAF" strokeWidth="5"/>
   <g transform="translate(0 55)">
    <Olya x={365} y={1510} scale={1.19} pose={p}/>
    <Kolya x={774} y={1510} scale={1.19} turn={kTurn} phoneLower={0}/>
   </g>
   <g opacity={bubbleOpacity}>
     <rect x="100" y="670" width="436" height="154" rx="33" fill={COLOR.sage}/>
     <path d="M355 815 L383 859 L403 813" fill={COLOR.sage}/>
     <text x="318" y="733" textAnchor="middle" fontSize="52" fill={COLOR.ink} fontWeight="750">СМОТРИ,</text>
     <text x="318" y="791" textAnchor="middle" fontSize="49" fill={COLOR.ink} fontWeight="750">КАК СМЕШНО!</text>
   </g>
   {f>=92&&<g opacity={smooth(92,113,f)}>
     <text x="537" y="854" fontSize="49" fontWeight="650" fill={COLOR.ink} textAnchor="middle">Он даже не повернулся.</text>
   </g>}
   <text x="540" y="1840" fontSize="34" letterSpacing="6" textAnchor="middle" fill="#67766E">ИЗОБИЛИЕ · ОТНОШЕНИЯ</text>
 </svg>
 </AbsoluteFill>;
};
