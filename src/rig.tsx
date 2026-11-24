import React from 'react';

export type Expression='happy'|'hopeful'|'waiting'|'hurt'|'neutral';
export type ArmPose = {shoulder:[number,number], elbow:[number,number], wrist:[number,number]};
export type Pose={headTilt:number, torsoLean:number, face:Expression, left:ArmPose, right:ArmPose, phoneAngle:number};
export const COLOR={ink:'#203D35',cream:'#FCF8F0',terra:'#C97653',sage:'#AAC1AC',dark:'#284F42',hair:'#203D35'};

const pt=(a:[number,number],b:[number,number],t:number):[number,number]=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
export const mixPose=(a:Pose,b:Pose,t:number):Pose=>({
 headTilt:a.headTilt+(b.headTilt-a.headTilt)*t,
 torsoLean:a.torsoLean+(b.torsoLean-a.torsoLean)*t,
 face:t<.5?a.face:b.face,
 phoneAngle:a.phoneAngle+(b.phoneAngle-a.phoneAngle)*t,
 left:{shoulder:pt(a.left.shoulder,b.left.shoulder,t),elbow:pt(a.left.elbow,b.left.elbow,t),wrist:pt(a.left.wrist,b.left.wrist,t)},
 right:{shoulder:pt(a.right.shoulder,b.right.shoulder,t),elbow:pt(a.right.elbow,b.right.elbow,t),wrist:pt(a.right.wrist,b.right.wrist,t)},
});

const stroke={stroke:COLOR.ink,strokeWidth:5,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
const arm=(p:ArmPose,fill:string,key:string)=> <g key={key}>
 <path d={`M${p.shoulder[0]} ${p.shoulder[1]} Q ${p.elbow[0]} ${p.elbow[1]} ${p.wrist[0]} ${p.wrist[1]}`} {...stroke} strokeWidth={15} stroke={fill} fill="none" />
 <path d={`M${p.shoulder[0]} ${p.shoulder[1]} L${p.elbow[0]} ${p.elbow[1]} L${p.wrist[0]} ${p.wrist[1]}`} {...stroke} strokeWidth={4} fill="none" />
 <circle cx={p.wrist[0]} cy={p.wrist[1]} r="9" fill={COLOR.cream} {...stroke} strokeWidth={3}/>
 </g>;

export const Olya:React.FC<{pose:Pose,x:number,y:number,scale?:number}> = ({pose,x,y,scale=1}) => {
 const phone=pose.right.wrist;
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <ellipse cx="0" cy="4" rx="107" ry="13" fill="#DCE1D5"/>
  <g transform={`translate(0 0) rotate(${pose.torsoLean} 0 -290)`}>
    <path d="M-52 -243 L-76 -25 L-16 -25 L0 -201 L18 -25 L78 -25 L51 -243 Z" fill={COLOR.cream} {...stroke}/>
    <path d="M-45 -25 L-58 -5 Q-35 9 -7 -6 L-16 -26" fill={COLOR.ink}/>
    <path d="M29 -25 L20 -5 Q48 8 75 -5 L76 -26" fill={COLOR.ink}/>
    <path d="M-54 -385 Q-87 -369 -72 -278 L-46 -225 L52 -225 L69 -280 Q84 -367 52 -384 Z" fill={COLOR.terra} {...stroke}/>
    {arm(pose.left,COLOR.terra,'left')}
    {arm(pose.right,COLOR.terra,'right')}
    <path d="M-25 -385 L-24 -416 L22 -416 L22 -385" fill={COLOR.cream} {...stroke}/>
    <g transform={`rotate(${pose.headTilt} 0 -479)`}>
      <ellipse cx="0" cy="-479" rx="72" ry="77" fill={COLOR.cream} {...stroke}/>
      <circle cx="-20" cy="-554" r="23" fill={COLOR.hair} />
      <path d="M-59 -507 Q-47 -549 -14 -548 Q12 -536 35 -540" fill="none" {...stroke} strokeWidth={7}/>
      <circle cx="-70" cy="-464" r="11" fill={COLOR.terra} {...stroke} strokeWidth={3}/>
      <circle cx="71" cy="-464" r="11" fill={COLOR.terra} {...stroke} strokeWidth={3}/>
      <path d="M-46 -492 q14 -9 25 -3 M13 -495 q16 -8 27 3" fill="none" {...stroke} strokeWidth={4}/>
      <ellipse cx="-29" cy="-478" rx="5" ry="8" fill={COLOR.ink}/>
      <ellipse cx="25" cy="-478" rx="5" ry="8" fill={COLOR.ink}/>
      {pose.face==='hurt'?<path d="M-12 -436 Q0 -450 14 -436" fill="none" {...stroke} strokeWidth={3}/>:
       pose.face==='waiting'?<path d="M-10 -439 L12 -439" fill="none" {...stroke} strokeWidth={3}/>:
       <path d="M-19 -445 Q-2 -427 19 -446" fill="none" {...stroke} strokeWidth={3}/>}
    </g>
    <g transform={`translate(${phone[0]} ${phone[1]}) rotate(${pose.phoneAngle})`}>
      <rect x="-17" y="-50" width="34" height="62" rx="6" fill={COLOR.dark} {...stroke} strokeWidth={3}/>
      <rect x="-12" y="-44" width="24" height="43" rx="2" fill="#C6DAD2"/>
      <circle cx="0" cy="5" r="3" fill={COLOR.cream}/>
    </g>
  </g>
 </g>;
};

export const Kolya:React.FC<{turn:number,phoneLower:number,x:number,y:number,scale?:number}> = ({turn,phoneLower,x,y,scale=1}) => {
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>
   <ellipse cx="0" cy="4" rx="108" ry="13" fill="#DCE1D5"/>
   <path d="M-59 -228 L-65 -12 L-9 -12 L-3 -212 L22 -12 L76 -12 L54 -228" fill={COLOR.cream} {...stroke}/>
   <path d="M-61 -12 L-74 0 L-11 0 L-9 -12 M22 -12 L19 0 L88 0 L76 -12" fill={COLOR.ink}/>
   <path d="M-58 -384 Q-89 -355 -58 -229 L58 -229 Q87 -360 55 -384" fill={COLOR.dark} {...stroke}/>
   <path d="M-47 -368 L-70 -325 L-38 -278 M45 -369 L69 -325 L39 -275" fill="none" stroke={COLOR.ink} strokeWidth="5"/>
   <g transform={`translate(0 -465) rotate(${turn*20})`}>
     <ellipse cx="0" cy="0" rx="72" ry="82" fill={COLOR.cream} {...stroke}/>
     <path d="M-55 -50 Q-45 -70 -20 -68 Q-15 -110 10 -100 Q38 -92 44 -64 Q24 -72 3 -69 Q-28 -61 -55 -50" fill={COLOR.cream} {...stroke} strokeWidth={7}/>
     <path d="M-44 -18 Q-29 -26 -18 -22 M20 -22 Q33 -29 45 -20" fill="none" {...stroke} strokeWidth={3}/>
     <ellipse cx={-28+turn*8} cy="-7" rx="4" ry="8" fill={COLOR.ink}/><ellipse cx={28+turn*8} cy="-7" rx="4" ry="8" fill={COLOR.ink}/>
     <path d={turn>.6?'M-14 39 Q0 48 14 39':'M-11 39 L13 39'} fill="none" {...stroke} strokeWidth={3}/>
   </g>
   <g transform={`translate(${34+phoneLower*20} ${-294+phoneLower*58}) rotate(${phoneLower*48-10})`}>
     <path d="M0 -20 L9 -5" fill="none" {...stroke} strokeWidth={5}/>
     <rect x="-14" y="-54" width="28" height="53" rx="5" fill={COLOR.dark} stroke={COLOR.ink} strokeWidth={3}/>
     <rect x="-9" y="-48" width="18" height="38" rx="2" fill="#B5CFBF"/>
   </g>
 </g>;
};
