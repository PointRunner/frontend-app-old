import { ReactNode } from 'react';
import { CustomModal, CustomModalContent } from './Styles.ModalBase';

const ModalBase = (props: { modalRef: any, modalOpenerButtonId: string; children: ReactNode | ReactNode[]; title: string }) => {



	return (
			<CustomModal ref={props.modalRef} trigger={props.modalOpenerButtonId}>
				<CustomModalContent>
					{props.children}
				</CustomModalContent>
			</CustomModal>
	);
};

export default ModalBase;
