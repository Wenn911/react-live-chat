import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Nav,
  Button,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

import { setCurrentChannelId } from '../slices/channelsInfoSlice.js';
import { openModal } from '../slices/modalSlice.js';

function IrremovableChannel({ name, buttonVariant, onClick }) {
  return (
    <Nav.Link
      as={Button}
      variant={buttonVariant}
      className="w-100 rounded-0 text-start"
      onClick={onClick}
    >
      {`# ${name}`}
    </Nav.Link>
  );
}

function RemovableChannel({
  name,
  buttonVariant,
  onClick,
  onRemove,
  onRename,
  t,
}) {
  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Nav.Link
        as={Button}
        variant={buttonVariant}
        onClick={onClick}
        className="text-start flex-grow-1 overflow-hidden"
      >
        {`# ${name}`}
      </Nav.Link>
      <Dropdown.Toggle
        split
        variant={buttonVariant}
        className="flex-grow-0 dropdown-toggle-split btn"
        data-testid="channel-dropdown"
      >
        <span className="visually-hidden">{t('channels.menu')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu data-testid="channel-dropdown-menu">
        <Dropdown.Item onClick={onRemove}>{t('buttons.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={onRename}>{t('buttons.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

function Channels() {
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const getButtonVariant = (id) => (id === currentChannelId ? 'primary' : 'light');

  const handleAddChannel = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  const handleRemoveChannel = (id) => () => {
    const extra = { channelId: id };
    dispatch(openModal({ type: 'removeChannel', extra }));
  };

  const handleRenameChannel = (id, name) => () => {
    const extra = { channelId: id, name };
    dispatch(openModal({ type: 'renameChannel', extra }));
  };

  const handleClickChannel = (id) => () => {
    dispatch(setCurrentChannelId({ id }));
  };

  const renderChannels = () => (
    <Nav className="nav flex-column nav-pills nav-fill px-2">
      {channels.map(({ id, name, removable }) => {
        const Channel = removable ? RemovableChannel : IrremovableChannel;
        return (
          <Nav.Item key={id} className="w-100">
            <Channel
              name={name}
              buttonVariant={getButtonVariant(id)}
              onClick={handleClickChannel(id)}
              onRemove={handleRemoveChannel(id)}
              onRename={handleRenameChannel(id, name)}
              t={t}
            />
          </Nav.Item>
        );
      })}
    </Nav>
  );

  return (
    <Col xs={3} className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('texts.channels')}</span>
        <Button type="button" variant="link" className="p-0 text-primary btn btn-group-vertical" onClick={handleAddChannel}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      {renderChannels()}
    </Col>
  );
}

export default Channels;
