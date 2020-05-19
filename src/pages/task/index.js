import React from 'react';
import Layout from '../../components/layout';
import Alert from '../../components/alert';
import FormTask from '../../components/formTask';
import ListTask from '../../components/listTask';
import { Card, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function TaskPage(props) {
  const {
    errors,
    success,
    message,
    loading,
    items,
    item,
    channels,
    method,
    onNewItem,
    onEditItem,
    onUpdateItem,
    onRemoveItem,
    onToggledItemComplete,
    handleSubmit,
    handleChange
  } = props;

  return (
    <Layout>
      <Card className="m-3 pt-2">
        {
          (loading) ?
            <Spinner animation="border" className="mx-auto" />
          : ''
        }
        <Alert 
          success={success}
          message={message}
          errors={errors}
        />

        <FormTask
          errors={errors}
          item={item}
          method={method}
          channels={channels}
          onNewItem={onNewItem}
          onUpdateItem={onUpdateItem}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
        <hr />
        <ListTask
          items={items}
          onEditItem={onEditItem}
          onRemoveItem={onRemoveItem}
          onToggledItemComplete={onToggledItemComplete}
        />
      </Card>
    </Layout>
  );
}

export default TaskPage;