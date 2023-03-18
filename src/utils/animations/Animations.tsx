import { Animation, createAnimation } from '@ionic/react';

export const pageSwitchAnimations = (baseEl: HTMLElement, opts?: any): Animation => {
	console.log(opts);
	const enteringAnimation = createAnimation()
		.addElement(opts.enteringEl)
		.fromTo('transform', `translate(${opts.animationDirection === 'right' ? '-' : ''}100%)`, 'translate(0%)')
		.duration(100);

	const leavingAnimation = createAnimation()
		.addElement(opts.leavingEl)
		.fromTo('transform', 'translate(0%)', `translate(${opts.animationDirection === 'right' ? '-' : ''}100%)`)
		.duration(100);

	const animation = createAnimation()
		.addAnimation(enteringAnimation)
		.addAnimation(leavingAnimation);

	return animation;
};
