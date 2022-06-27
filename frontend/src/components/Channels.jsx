import React from 'react'
import { Button, ButtonGroup, Col, Dropdown, Nav } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannelId } from '../slices/channelsSlice';


const NonRemovableChannels = ({ name, buttonVariant, onClick }) => (
    <Nav.Link
        as={Button}
        variant={buttonVariant}
        block
        className='mb-2 text=align'
        onClick={onClick}
    >{name}</Nav.Link>
);

const RemovableChannel = ({ name, buttonVariant, onClick, onRemove, onRename, t }) => {
    <Dropdown as={ButtonGroup} className='d-flex mb-2'>
        <Nav.Link
            as={Button}
            variant={buttonVariant}
            onClick={onClick}
            className='text-left flex-grow-1'
            >{name}
        </Nav.Link>
        <Dropdown.Toggle
            split
            variant={buttonVariant}
            className='flex-grow-2'
            data-testid='channel-dropdown'
        />
        <Dropdown.Menu data-testid="channel-dropdown-menu">
            <Dropdown.Item onClick={onRemove}>{t('buttons.remove')}</Dropdown.Item>
            <Dropdown.Item onClick={onRename}>{t('buttons.rename')}</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
};

const Channels = () => {
    const { channels, currentChannelId } = useSelector((state) => state.channelsSlice);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const getButtonVariant = (id) => (id === currentChannelId ? 'primary' : 'light');

    const handleAddChannel = () => {
        //dispatch(/openModal)
    };

    const handleClickChannel = (id) => {
        dispatch(setCurrentChannelId({ id }));
    }

    const renderChannels = () => {
        <Nav variant="pills" fill className='flex-column'>
            {channels.map(({ id, name, removable }) => {
                const Channel = removable ? RemovableChannel : NonRemovableChannels;
                return (
                    <Nav.Item key={id}>
                        <Channel 
                        name={name}
                        buttonVariant={getButtonVariant(id)}
                        onClick={handleClickChannel(id)}
                        t={t} />
                    </Nav.Item>
                );
            })}
        </Nav>
    };
  return (
    <Col xs={3} className='border-right'>
        <div className='d-flex mb-2'>
            <span>{t('texts.channels')}</span>
            <Button variant='link' className='ml-auto p-0' 
            //onClick={handleAddChannel}
            >+</Button>
        </div>
        {renderChannels()}
    </Col>
  );
};

export default Channels