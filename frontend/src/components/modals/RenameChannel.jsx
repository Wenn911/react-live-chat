import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import { useSocket } from '../../hooks';
import { channelSchema } from '../../validations';
import {toast} from "react-toastify";
import leoProfanity from "leo-profanity";

const RenameChannelForm = ({ onHide }) => {
    const { channelId, name } = useSelector((state) => state.modal.extra);
    const { t } = useTranslation();
    const socket = useSocket();

    const nameRef = useRef();

    const formik = useFormik({
        initialValues: {
            name,
        },
        validationSchema: channelSchema,
        onSubmit: ({ name: newName }, { setSubmitting }) => {
            setSubmitting(true);
            const filteredName = leoProfanity.clean(newName)
            
            const channel = { id: channelId, name: filteredName };

            socket.emit('renameChannel', channel, ({ status }) => {
                if (status === 'ok') {
                    toast.success(t('channels.renamed'));
                    onHide();
                }
            });
        },
    });

    useEffect(() => {
        nameRef.current.select();
    }, []);

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
                <Form.Control
                  name='name'
                  aria-label='Rename channel'
                  data-testid='rename-channel'
                  className='mb-2'
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  isInvalid={formik.errors.name}
                  readOnly={formik.isSubmitting}
                  ref={nameRef}
                  id="name"
                />
                <label className="visually-hidden" htmlFor="name">{t('texts.channelName')}</label>
                  {formik.errors.name && <Form.Control.Feedback type='invalid'>{t(formik.errors.name)}</Form.Control.Feedback>}
            </Form.Group>
            <div className="d-flex justify-content-end border-top pt-2">
                <Button
                  type='button'
                  className='mr-2'
                  variant='secondary'
                  onClick={onHide}
                  disabled={formik.isSubmitting}
                >{t('buttons.cancel')}</Button>
                <Button type='submit' data-testid='rename-button' disabled={formik.isSubmitting}>
                    {formik.isSubmitting && <Spinner className='mr-1' animation='border' size='sm' />}
                    {t('buttons.rename')}
                </Button>
            </div>
        </Form>
    )
}

const RenameChannel = ({ onExited }) => {
    const [show, setShow] = useState(true);
    const { t } = useTranslation();

    const onHide = () => {
        setShow(false);
    };

  return (
    <Modal show={show} onHide={onHide} onExited={onExited}>
        <Modal.Header closeButton>
            <Modal.Title>{t('texts.renameChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <RenameChannelForm onHide={onHide} />
        </Modal.Body>
    </Modal>
  );
};

export default RenameChannel