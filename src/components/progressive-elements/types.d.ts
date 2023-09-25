interface Label extends HTMLLabelAttributes {
	text: string;
	position?: 'before' | 'after';
}

interface SubmitValue {
	name: string;
	value: any;
}

export interface StandaloneProps {
	method?: 'POST' | 'GET';
	action?: string;
	submitFunction?: SubmitFunction;
	label?: Label | undefined;
	submitValues: SubmitValue[];
}
