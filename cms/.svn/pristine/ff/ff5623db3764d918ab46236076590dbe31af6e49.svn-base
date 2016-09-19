<?php
/* Open report modules.*/
$config->report = new stdclass();
$config->report->moduleList['customer'] = TABLE_CUSTOMER;
$config->report->moduleList['order']    = TABLE_ORDER;
$config->report->moduleList['contract'] = TABLE_CONTRACT;

$config->report->customer = new stdclass();
/* select conditions, groupBy|(count field default is same as groupby)|(count|sum default is count). */
$config->report->customer->chartList['assignedTo'] = 'assignedTo||';
$config->report->customer->chartList['status']     = 'status||';
$config->report->customer->chartList['level']      = 'level||';
$config->report->customer->chartList['type']       = 'type||';
$config->report->customer->chartList['size']       = 'size||';
$config->report->customer->chartList['area']       = 'area||';
$config->report->customer->chartList['industry']   = 'industry||';

/* type list name. */
$config->report->customer->listName['assignedTo'] = 'USERS';
$config->report->customer->listName['status']     = 'statusList';
$config->report->customer->listName['level']      = 'levelNameList';
$config->report->customer->listName['type']       = 'typeList';
$config->report->customer->listName['size']       = 'sizeNameList';
$config->report->customer->listName['area']       = 'AREA';
$config->report->customer->listName['industry']   = 'INDUSTRY';

/* order setting. */
$config->report->order = new stdclass();
$config->report->order->chartList['product']      = 'product_multi||';
$config->report->order->chartList['productLine']  = 'productLine_multi||';
$config->report->order->chartList['status']       = 'status||';
$config->report->order->chartList['createdBy']    = 'createdBy||';
$config->report->order->chartList['assignedTo']   = 'assignedTo||';
$config->report->order->chartList['productA']     = 'product_multi|`real`|sum';
$config->report->order->chartList['productLineA'] = 'productLine_multi|`real`|sum';
$config->report->order->chartList['statusA']      = 'status|`real`|sum';
$config->report->order->chartList['createdByA']   = 'createdBy|`real`|sum';
$config->report->order->chartList['assignedToA']  = 'assignedTo|`real`|sum';

$config->report->order->listName['product']      = 'PRODUCTS';
$config->report->order->listName['productLine']  = 'productLineList';
$config->report->order->listName['status']       = 'statusList';
$config->report->order->listName['createdBy']    = 'USERS';
$config->report->order->listName['assignedTo']   = 'USERS';
$config->report->order->listName['productA']     = 'PRODUCTS';
$config->report->order->listName['productLineA'] = 'productLineList';
$config->report->order->listName['statusA']      = 'statusList';
$config->report->order->listName['createdByA']   = 'USERS';
$config->report->order->listName['assignedToA']  = 'USERS';

/* contract setting. */
$config->report->contract = new stdclass();
$config->report->contract->chartList['status']       = 'status||';
$config->report->contract->chartList['delivery']     = 'delivery||';
$config->report->contract->chartList['return']       = '`return`||';
$config->report->contract->chartList['createdBy']    = 'createdBy||';
$config->report->contract->chartList['signedBy']     = 'signedBy||';
$config->report->contract->chartList['deliveredBy']  = 'deliveredBy||';
$config->report->contract->chartList['handlers']     = 'handlers_multi||';
$config->report->contract->chartList['contactedBy']  = 'createdBy||';
$config->report->contract->chartList['statusA']      = 'status|amount|sum';
$config->report->contract->chartList['deliveryA']    = 'delivery|amount|sum';
$config->report->contract->chartList['returnA']      = '`return`|amount|sum';
$config->report->contract->chartList['createdByA']   = 'createdBy|amount|sum';
$config->report->contract->chartList['signedByA']    = 'signedBy|amount|sum';
$config->report->contract->chartList['deliveredByA'] = 'deliveredBy|amount|sum';
$config->report->contract->chartList['handlersA']    = 'handlers_multi|amount|sum';
$config->report->contract->chartList['contactedByA'] = 'createdBy|amount|sum';

$config->report->contract->listName['status']       = 'statusList';
$config->report->contract->listName['delivery']     = 'deliveryList';
$config->report->contract->listName['return']       = 'returnList';
$config->report->contract->listName['createdBy']    = 'USERS';
$config->report->contract->listName['signedBy']     = 'USERS';
$config->report->contract->listName['deliveredBy']  = 'USERS';
$config->report->contract->listName['handlers']     = 'USERS';
$config->report->contract->listName['contactedBy']  = 'USERS';
$config->report->contract->listName['statusA']      = 'statusList';
$config->report->contract->listName['deliveryA']    = 'deliveryList';
$config->report->contract->listName['returnA']      = 'returnList';
$config->report->contract->listName['createdByA']   = 'USERS';
$config->report->contract->listName['signedByA']    = 'USERS';
$config->report->contract->listName['deliveredByA'] = 'USERS';
$config->report->contract->listName['handlersA']    = 'USERS';
$config->report->contract->listName['contactedByA'] = 'USERS';
