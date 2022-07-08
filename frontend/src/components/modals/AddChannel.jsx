import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSocket } from '../../hooks';
import { useFormik } from 'formik';
import { channelSchema } from '../../validations';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';


const AddChannelForm = ({ onHide }) => {
    const { t } = useTranslation();
    const socket = useSocket();
    const nameRef = useRef();
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: channelSchema,
        onSubmit: ({ name }, { setSubmitting }) => {
            setSubmitting(true);

            const channel = { name };

            socket.emit('newChannel', channel, ({ status }) => {
                if (status === 'ok') {
                    onHide();
                }
            });
        },
    });

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
                <Form.Control
                name='name'
                aria-label='Add Channel'
                data-teseid='add-channel'
                className='mb-2'
                onChange={formik.handleChange}
                value={formik.values.name}
                isInvalid={formik.errors.name}
                readOnly={formik.isSubmitting}
                ref={nameRef}
                />
                {formik.errors.name
                  && <Form.Control.Feedback type='invalid'>{t(formik.errors.name)}</Form.Control.Feedback>}
            </Form.Group>
            <div className='d-flex justify-content-end border-top pt-2'>
                <Button
                  type='button'
                  className='mr-2'
                  variant='secondary'
                  onClick={onHide}
                  disabled={formik.isSubmitting}
                >
                {formik.isSubmitting 
                  && <Spinner className='mr-1' animation='border' size='sm' />} 
                  {t('buttons.add')}   
                </Button>
            </div>
        </Form>
    );
};

const AddChannel = ({ onExited }) => {
    const [show, setShow] = useState(true);

    const onHide = () => {
        setShow(false);
    };

    const { t } = useTranslation();
  return (
    <Modal show={show} onHide={onHide} onExited={onExited}>
        <Modal.Header closeButton>
            <Modal.Title>{t('texts.addChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AddChannelForm onHide={onHide} />
        </Modal.Body>
    </Modal>
  )
}

export default AddChannel