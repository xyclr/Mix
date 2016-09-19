<?php
/**
 * The control file of trade module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     trade
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class trade extends control
{
    /** 
     * The index page, locate to the browse page.
     * 
     * @access public
     * @return void
     */
    public function index()
    {
        $this->locate(inlink('browse'));
    }

    /**
     * Browse trade.
     * 
     * @param string $orderBy     the order by
     * @param int    $recTotal 
     * @param int    $recPerPage 
     * @param int    $pageID 
     * @access public
     * @return void
     */
    public function browse($mode = 'all', $date = '', $orderBy = 'date_desc', $recTotal = 0, $recPerPage = 20, $pageID = 1)
    {   
        if($mode == 'out') $this->trade->checkExpensePriv();

        $this->app->loadClass('pager', $static = true);
        $pager = new pager($recTotal, $recPerPage, $pageID);

        $expenseTypes = $this->loadModel('tree')->getPairs(0, 'out');
        $incomeTypes  = $this->loadModel('tree')->getPairs(0, 'in');

        $this->session->set('tradeList', $this->app->getURI(true));

        /* Build search form. */
        $this->loadModel('search', 'sys');
        $this->config->trade->search['actionURL'] = $this->createLink('trade', 'browse', 'mode=bysearch');
        $this->config->trade->search['params']['depositor']['values'] = array('' => '') + $this->loadModel('depositor')->getPairs();
        $this->config->trade->search['params']['trader']['values']    = $this->loadModel('customer', 'crm')->getPairs();
        $this->config->trade->search['params']['category']['values']  = array('' => '') + $this->lang->trade->categoryList + $expenseTypes + $incomeTypes;
        $this->search->setSearchParams($this->config->trade->search);

        $tradeDates = $this->trade->getDatePairs();

        $tradeYears    = array();
        $tradeQuarters = array();
        $tradeMonths   = array();
        foreach($tradeDates as $tradeDate)
        {
            $year  = substr($tradeDate, 0, 4);
            $month = substr($tradeDate, 5, 2);

            if(!in_array($year, $tradeYears)) $tradeYears[] = $year;

            if(!isset($tradeQuarters[$year])) $tradeQuarters[$year] = array();
            foreach($this->lang->trade->quarters as $key => $quarterMonth)
            {
                if(strpos($quarterMonth, $month) !== false)    
                {
                    $quarter = $key;
                    if(!in_array($key, $tradeQuarters[$year])) $tradeQuarters[$year][] = $key;
                }
            }

            krsort($tradeQuarters[$year]);

            if(!isset($tradeMonths[$year][$quarter])) $tradeMonths[$year][$quarter] = array();

            if(!in_array($month, $tradeMonths[$year][$quarter]))
            {
                $tradeMonths[$year][$quarter][] = $month;
            }

            krsort($tradeMonths[$year][$quarter]);
        }

        $trades = $this->trade->getList($mode, $date, $orderBy, $pager);
        $this->session->set('tradeQueryCondition', $this->dao->get());

        $currentYear = current($tradeYears);
        array_shift($tradeYears);

        $this->view->title   = $this->lang->trade->browse;
        $this->view->trades  = $trades;
        $this->view->mode    = $mode;
        $this->view->date    = $date;
        $this->view->pager   = $pager;
        $this->view->orderBy = $orderBy;

        $this->view->depositorList = $this->loadModel('depositor')->getPairs();
        $this->view->customerList  = $this->loadModel('customer', 'crm')->getPairs();
        $this->view->deptList      = $this->loadModel('tree')->getPairs(0, 'dept');
        $this->view->categories    = $this->lang->trade->categoryList + $expenseTypes + $incomeTypes;
        $this->view->users         = $this->loadModel('user')->getPairs();
        $this->view->currencySign  = $this->loadModel('common', 'sys')->getCurrencySign();
        $this->view->currencyList  = $this->common->getCurrencyList();
        $this->view->tradeYears    = $tradeYears;
        $this->view->tradeQuarters = $tradeQuarters;
        $this->view->tradeMonths   = $tradeMonths;
        $this->view->currentYear   = $currentYear;

        $this->display();
    }   

    /**
     * Create a contact.
     * 
     * @param  string $type 
     * @access public
     * @return void
     */
    public function create($type = '')
    {
        if($_POST)
        {
            $tradeID = $this->trade->create($type); 
            if(dao::isError())$this->send(array('result' => 'fail', 'message' => dao::getError()));

            $this->loadModel('action')->create('trade', $tradeID, 'Created', '');

            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('browse')));
        }

        unset($this->lang->trade->menu);
        $this->view->title         = $this->lang->trade->{$type};
        $this->view->type          = $type;
        $this->view->depositorList = array('' => '') + $this->loadModel('depositor')->getPairs();
        $this->view->productList   = $this->loadModel('product', 'crm')->getPairs();
        $this->view->orderList     = $this->loadModel('order', 'crm')->getPairs($customerID = 0);
        $this->view->customerList  = $this->loadModel('customer', 'crm')->getPairs('client');
        $this->view->traderList    = $this->loadModel('customer', 'crm')->getPairs('provider');
        $this->view->contractList  = $this->loadModel('contract', 'crm')->getPairs($customerID = 0);
        $this->view->deptList      = $this->loadModel('tree')->getOptionMenu('dept', 0, $removeRoot = true);
        $this->view->users         = $this->loadModel('user')->getPairs('nodeleted');

        if($type == 'out') $this->view->categories = $this->lang->trade->expenseCategoryList + $this->loadModel('tree')->getOptionMenu('out', 0, $removeRoot = true);
        if($type == 'in')  $this->view->categories = $this->lang->trade->incomeCategoryList + $this->loadModel('tree')->getOptionMenu('in', 0, $removeRoot = true);

        $this->display();
    }

    /**
     * Batch create trade.
     * 
     * @access public
     * @return void
     */
    public function batchCreate()
    {
        if($_POST)
        {
            $result = $this->trade->batchCreate();
            if($result['result'] != 'success') $this->send($result);

            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('browse')));
        }

        unset($this->lang->trade->menu);
        unset($this->lang->trade->typeList['transferin']);
        unset($this->lang->trade->typeList['transferout']);
        unset($this->lang->trade->typeList['inveset']);
        unset($this->lang->trade->typeList['redeem']);

        $this->view->title        = $this->lang->trade->batchCreate;
        $this->view->depositors   = array('' => '') + $this->loadModel('depositor')->getPairs();
        $this->view->users        = $this->loadModel('user')->getPairs('nodeleted');
        $this->view->customerList = $this->loadModel('customer', 'crm')->getPairs('client');
        $this->view->traderList   = $this->loadModel('customer', 'crm')->getPairs('provider');
        $this->view->expenseTypes = array('' => '') + $this->lang->trade->expenseCategoryList + $this->loadModel('tree')->getOptionMenu('out', 0, $removeRoot = true);
        $this->view->incomeTypes  = array('' => '') + $this->lang->trade->incomeCategoryList + $this->loadModel('tree')->getOptionMenu('in', 0, $removeRoot = true);
        $this->view->deptList     = $this->loadModel('tree')->getOptionMenu('dept', 0, $removeRoot = true);

        $this->display();
    }

    /**
     * Edit a trade.
     * 
     * @param  int    $tradeID 
     * @access public
     * @return void
     */
    public function edit($tradeID)
    {
        $trade = $this->trade->getByID($tradeID);
        if(empty($trade)) die();
        if($trade->type == 'out') $this->loadModel('tree')->checkRight($trade->category);

        if($_POST)
        {
            $changes = $this->trade->update($tradeID);
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));

            if($changes)
            {
                $actionID = $this->loadModel('action')->create('trade', $tradeID, 'Edited', '');
                $this->action->logHistory($actionID, $changes);
            }
            
            $backURL = $this->session->tradeList == false ? inlink('browse') : $this->session->tradeList;
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => $backURL));
        }
        
        $objectType = array();
        if($trade->order)    $objectType[] = 'order';
        if($trade->contract) $objectType[] = 'contract';
        $this->view->objectType = $objectType;
       
        $this->view->title         = $this->lang->trade->edit;
        $this->view->trade         = $trade;
        $this->view->depositorList = $this->loadModel('depositor')->getPairs();
        $this->view->customerList  = $this->loadModel('customer', 'crm')->getPairs('client');
        $this->view->traderList    = $this->loadModel('customer', 'crm')->getPairs('provider');
        $this->view->productList   = $this->loadModel('product', 'crm')->getPairs();
        $this->view->orderList     = $this->loadModel('order', 'crm')->getPairs($customerID = 0);
        $this->view->contractList  = array('' => '') + $this->loadModel('contract', 'crm')->getPairs($customerID = 0);
        $this->view->tradeContract = array('' => '') + $this->loadModel('contract', 'crm')->getPairs($customerID = $trade->trader);
        $this->view->users         = $this->loadModel('user')->getPairs('nodeleted');
        $this->view->deptList      = $this->loadModel('tree')->getOptionMenu('dept', 0, $removeRoot = true);
       
        if($trade->type == 'out') $this->view->categories = $this->lang->trade->expenseCategoryList + $this->loadModel('tree')->getOptionMenu('out', 0);
        if($trade->type == 'in')  $this->view->categories = $this->lang->trade->incomeCategoryList + $this->loadModel('tree')->getOptionMenu('in', 0);

        $this->display();
    }

    /**
     * Transfer.
     * 
     * @access public
     * @return void
     */
    public function transfer()
    {
        if($_POST)
        {
            $result = $this->trade->transfer(); 
            $this->send($result);
        }

        unset($this->lang->trade->menu);
        $this->view->title         = $this->lang->trade->transfer;
        $this->view->users         = $this->loadModel('user')->getPairs();
        $this->view->deptList      = $this->loadModel('tree')->getOptionMenu('dept', 0, $removeRoot = true);
        $this->view->depositorList = $this->loadModel('depositor')->getList();

        $this->display();
    }

    /**
     * Inveset.
     * 
     * @access public
     * @return void
     */
    public function inveset()
    {
        if($_POST)
        {
            $this->trade->inveset(); 
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('browse')));
        }

        unset($this->lang->trade->menu);
        $this->view->title         = $this->lang->trade->inveset;
        $this->view->users         = $this->loadModel('user')->getPairs('nodeleted');
        $this->view->deptList      = $this->loadModel('tree')->getOptionMenu('dept', 0, $removeRoot = true);
        $this->view->depositorList = array('' => '') + $this->loadModel('depositor')->getPairs();
        $this->view->traderList    = $this->loadModel('customer', 'crm')->getPairs('provider');

        $this->display();
    }

    /**
     * manage detail of a trade.
     * 
     * @param  int    $tradeID 
     * @access public
     * @return void
     */
    public function detail($tradeID)
    {
        $trade = $this->trade->getByID($tradeID);
        if($trade->type == 'out') $this->loadModel('tree')->checkRight($trade->category);

        if($_POST)
        {
            $result = $this->trade->saveDetail($tradeID); 
            if($result) $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('browse')));
            $this->send(array('result' => 'fail', 'message' => dao::getError()));
        }

        $details = $this->trade->getDetail($tradeID);
        if(empty($details))
        {
            $detail = $trade;
            $detail->desc = '';
            $detail->money = '';
            $details[] = $detail;
        }

        $this->view->title      = $this->lang->trade->detail;
        $this->view->modalWidth = 900;
        $this->view->trade      = $trade;
        $this->view->details    = $details;
        $this->view->users      = $this->loadModel('user')->getPairs();

        if($trade->type == 'out') $this->view->categories = $this->lang->trade->expenseCategoryList + $this->loadModel('tree')->getOptionMenu('out', 0, $removeRoot = true);
        if($trade->type == 'in')  $this->view->categories = $this->lang->trade->incomeCategoryList + $this->loadModel('tree')->getOptionMenu('in', 0, $removeRoot = true);

        $this->display();
    }

    /**
     * Import csv. 
     * 
     * @access public
     * @return void
     */
    public function import()
    {
        if($_POST)
        {
            $file = $this->loadModel('file')->getUpload('files');
            $file = $file[0];

            $fc = file_get_contents($file['tmpname']);
            if( $this->post->encode != "utf8") 
            {
                if(function_exists('mb_convert_encoding'))
                {
                    $fc = @mb_convert_encoding($fc, 'utf-8', $this->post->encode);
                }              
                elseif(function_exists('iconv'))
                {
                    $fc = @iconv($this->post->encode, 'utf-8', $fc);
                }
                else
                {              
                    $this->send(array('result' => 'fail', 'message' => $this->lang->noConvertFun));
                }              
            }                  
            file_put_contents($this->file->savePath . $file['pathname'], $fc);

            $file = $this->file->savePath . $file['pathname'];
            $this->session->set('importFile', $file);
            $this->send(array('result' => 'success', 'locate' => inlink('showImport', "depositorID={$this->post->depositor}&schemaID={$this->post->schema}")));
        }

        $this->view->title      = $this->lang->trade->import;
        $this->view->modalWidth = 600;
        $this->view->schemas    = $this->loadModel('schema')->getPairs();
        $this->view->depositors = array('' => '') + $this->loadModel('depositor')->getPairs();
        $this->display();
    }

    /**
     * Batch edit trades.
     * 
     * @param  string $step  form|save
     * @access public
     * @return void
     */
    public function batchEdit($step = 'form')
    {
        if($step == 'save')
        {
            $result =  $this->trade->batchUpdate();
            $this->send($result);
        }

        unset($this->lang->trade->menu);

        $this->view->title        = $this->lang->trade->batchCreate;
        $this->view->trades       = $this->trade->getByIdList($this->post->tradeIDList);
        $this->view->depositors   = $this->loadModel('depositor')->getPairs();
        $this->view->users        = $this->loadModel('user')->getPairs();
        $this->view->customerList = $this->loadModel('customer', 'crm')->getPairs('client');
        $this->view->traderList   = $this->loadModel('customer', 'crm')->getPairs('provider');
        $this->view->expenseTypes = array('' => '') + $this->lang->trade->expenseCategoryList + $this->loadModel('tree')->getOptionMenu('out', 0, $removeRoot = true);
        $this->view->incomeTypes  = array('' => '') + $this->lang->trade->incomeCategoryList + $this->loadModel('tree')->getOptionMenu('in', 0, $removeRoot = true);
        $this->view->deptList     = $this->loadModel('tree')->getOptionMenu('dept', 0, $removeRoot = true);

        $this->display();
    }

    /**
     * Show import data.
     * 
     * @param  int    $depositorID 
     * @param  int    $schemaID 
     * @access public
     * @return void
     */
    public function showImport($depositorID, $schemaID)
    {
        if($_POST)
        {
            $return = $this->trade->saveImport($depositorID);

            if($return['result'] == 'success') $this->session->set('importFile', '');
            $this->send($return);
        }

        $schema = $this->loadModel('schema')->getByID($schemaID);

        /* Parse field to col. */
        $fields = explode(',', $this->config->trade->importField);
        $fields = array_flip($fields);
        foreach($fields as $field => $col)
        {
            $col = $schema->$field;

            if($field == 'desc' and $col)
            {
                $cols = explode(',', str_replace(' ', '', $col));
                $fields[$field] = array();
                foreach($cols as $col)
                {
                    if(empty($col)) continue;
                    $order = ord(strtoupper($col)) - ord('A');
                    $fields[$field][$order] = $order;
                }
                continue;
            }
            
            /* When the money of in and out is different then parse them. */
            if($field == 'money' and strpos($schema->money, ',') !== false)
            {
                list($in, $out) = explode(',', str_replace(' ', '', $col));
                $fields[$field] = array();
                $fields[$field]['in']  = ord(strtoupper($in)) - ord('A');
                $fields[$field]['out'] = ord(strtoupper($out)) - ord('A');
                continue;
            }

            $fields[$field] = empty($col) ? '' : ord(strtoupper($col)) - ord('A');
        }

        $rows = $this->schema->parseCSV($this->session->importFile);

        unset($this->lang->trade->menu);
        unset($this->lang->trade->typeList['transferin']);
        unset($this->lang->trade->typeList['transferout']);
        unset($this->lang->trade->typeList['inveset']);
        unset($this->lang->trade->typeList['redeem']);

        $customerList  = $this->loadModel('customer', 'crm')->getPairs('client');
        $traderList    = $this->customer->getPairs('provider,partner');
        $expenseTypes  = array('' => '') + $this->lang->trade->expenseCategoryList + $this->loadModel('tree')->getOptionMenu('out', 0, $removeRoot = true);
        $incomeTypes   = array('' => '') + $this->lang->trade->incomeCategoryList + $this->tree->getOptionMenu('in', 0, $removeRoot = true);
        $deptList      = $this->loadModel('tree')->getPairs(0, 'dept');
        $flipCustomers = array_flip($customerList);
        $flipTraders   = array_flip($traderList);
        $flipTypeList  = array_flip($this->lang->trade->typeList);
        $flipDeptList  = array_flip($deptList);

        $dataList = array();
        foreach($rows as $row)
        {
            /* Exclude invalid column. */
            if(is_array($fields['money']))
            {
                if(!isset($row[$fields['money']['in']]) or !isset($row[$fields['money']['out']])) continue;

                /* if money is 1,600 or 1 600 then replace them. */
                $row[$fields['money']['in']]  = str_replace(array(',', ' '), '', $row[$fields['money']['in']]);
                $row[$fields['money']['out']] = str_replace(array(',', ' '), '', $row[$fields['money']['out']]);
                if(!is_numeric($row[$fields['money']['in']]) and !is_numeric($row[$fields['money']['out']])) continue;
            }
            else
            {
                if(!isset($row[$fields['money']])) continue;

                $row[$fields['money']] = str_replace(array(',', ' '), '', $row[$fields['money']]);
                if(!is_numeric($row[$fields['money']])) continue;
            }

            $data = array();
            foreach($fields as $field => $col)
            {
                /* Desc can multiseriate. */
                if($field == 'desc' and !empty($col))
                {
                    $data[$field] = '';
                    foreach($fields[$field] as $col) $data[$field] .= isset($row[$col]) ? trim($row[$col]) . "\n" : '';
                    $data[$field] = trim($data[$field]);
                    continue;
                }

                /* if money has in and out items, then type can judging by their. */
                if($field == 'type' and is_array($col)) continue;
                if($field == 'money' and is_array($col))
                {
                    $data[$field] = is_numeric($row[$col['in']]) ? trim($row[$col['in']]) : trim($row[$col['out']]);
                    $data['type'] = is_numeric($row[$col['in']]) ? 'in' : 'out';
                    continue;
                }

                $data[$field] = (is_int($col) and isset($row[$col])) ? trim($row[$col]) : '';
                if($field == 'date') $data[$field] = date('Y-m-d', strtotime($data[$field]));
            }

            if(isset($flipDeptList[$data['dept']])) $data['dept'] = $flipDeptList[$data['dept']];

            if(isset($flipTypeList[$data['type']])) $data['type'] = $flipTypeList[$data['type']];


            $matchs = $data['type'] == 'out' ? $flipTraders : ($data['type'] == 'in' ? $flipCustomers : '');
            if($matchs and isset($matchs[$data['trader']])) $data['trader'] = $matchs[$data['trader']];

            if(!empty($data['category']) and in_array($data['type'], array('in', 'out')))
            {
                $categories = $data['type'] == 'out' ? $expenseTypes : $incomeTypes;
                foreach($categories as $id => $category)
                {
                    if(strpos($category, $data['category']) !== false)
                    {
                        $data['category'] = $id;
                        break;
                    }
                }
            }

            if(!$fields['fee'] and in_array($data['category'], array('fee', 'profit', 'loss')) and $data['trader']) continue;
 
            $fee = $data['fee'];
            unset($data['fee']);
            $dataList[] = $data;

            if($schema->fee and $fee)
            {
                $data['type']  = 'out';
                $data['money'] = $fee;
                $data['desc']  = '';
                $dataList[]    = $data;
            }
        }

        $this->view->title        = $this->lang->trade->showImport;
        $this->view->trades       = $dataList;
        $this->view->depositor    = $this->loadModel('depositor')->getByID($depositorID);
        $this->view->users        = $this->loadModel('user')->getPairs();
        $this->view->customerList = $customerList;
        $this->view->traderList   = $traderList;
        $this->view->expenseTypes = $expenseTypes;
        $this->view->incomeTypes  = $incomeTypes;
        $this->view->deptList     = $this->tree->getOptionMenu('dept', 0, $removeRoot = true);

        $this->display();
    }

    /**
     * Delete a trade.
     * 
     * @param  int      $tradeID 
     * @access public
     * @return void
     */
    public function delete($tradeID)
    {
        $trade = $this->trade->getByID($tradeID);
        if($trade->type == 'out') $this->loadModel('tree')->checkRight($trade->category);

        if($this->trade->delete($tradeID)) $this->send(array('result' => 'success'));
        $this->send(array('result' => 'fail', 'message' => dao::getError()));
    }

    /**
     * get data to export.
     * 
     * @param  int $projectID 
     * @param  string $orderBy 
     * @access public
     * @return void
     */
    public function export($mode, $orderBy = 'id_desc')
    {
        if($_POST)
        {
            $tradeLang   = $this->lang->trade;
            $tradeConfig = $this->config->trade;

            /* Create field lists. */
            $fields = explode(',', $tradeConfig->exportFields);
            foreach($fields as $key => $fieldName)
            {
                $fieldName = trim($fieldName);
                $fields[$fieldName] = isset($tradeLang->$fieldName) ? $tradeLang->$fieldName : $fieldName;
                unset($fields[$key]);
            }

            /* Get trades. */
            $trades = array();
            if($mode == 'all')
            {
                $tradeQueryCondition = $this->session->tradeQueryCondition;
                if(strpos($tradeQueryCondition, 'limit') !== false) $tradeQueryCondition = substr($tradeQueryCondition, 0, strpos($tradeQueryCondition, 'limit'));
                $stmt = $this->dbh->query($tradeQueryCondition);
                while($row = $stmt->fetch()) $trades[$row->id] = $row;
            }

            if($mode == 'thisPage')
            {
                $stmt = $this->dbh->query($this->session->tradeQueryCondition);
                while($row = $stmt->fetch()) $trades[$row->id] = $row;
            }

            /* Get users and projects. */
            $expenseTypes = $this->loadModel('tree')->getPairs(0, 'out');
            $incomeTypes  = $this->loadModel('tree')->getPairs(0, 'in');
            
            $users      = $this->loadModel('user')->getPairs('noletter');
            $depositors = $this->loadModel('depositor')->getPairs();
            $customers  = $this->loadModel('customer', 'crm')->getPairs();
            $deptList   = $this->loadModel('tree')->getPairs(0, 'dept');
            $categories = $this->lang->trade->categoryList + $expenseTypes + $incomeTypes;

            $details = $this->dao->select('*')->from(TABLE_TRADE)->where('parent')->ne('')->fetchGroup('parent');

            foreach($trades as $trade)
            {
                $trade->detail = array();
                if(isset($details[$trade->id]))
                {
                    foreach($details[$trade->id] as $detail)
                    {
                        $detail->desc = htmlspecialchars_decode($detail->desc);
                        $detail->desc = str_replace("<br />", "\n", $detail->desc);
                        $detail->desc = str_replace('"', '""', $detail->desc);

                        $trade->detail[] = $categories[$detail->category] . $detail->money . '(' . $detail->desc . ')';
                    }
                }
            }

            foreach($trades as $trade)
            {
                $trade->desc = htmlspecialchars_decode($trade->desc);
                $trade->desc = str_replace("<br />", "\n", $trade->desc);
                $trade->desc = str_replace('"', '""', $trade->desc);

                if(isset($depositors[$trade->depositor]))     $trade->depositor = $depositors[$trade->depositor];
                if(isset($customers[$trade->trader]))         $trade->trader    = $customers[$trade->trader] . "(#$trade->trader)";
                if(isset($deptList[$trade->dept]))            $trade->dept      = $deptList[$trade->dept];
                if(isset($categories[$trade->category]))      $trade->category  = $categories[$trade->category];
                if(isset($orders[$trade->order]))             $trade->order     = $orders[$trade->order];
                if(isset($contracts[$trade->contract]))       $trade->contract  = $contracts[$trade->contract];
                if(isset($tradeLang->typeList[$trade->type])) $trade->type      = $tradeLang->typeList[$trade->type];
                if(isset($this->lang->currencyList[$trade->currency])) $trade->currency = $this->lang->currencyList[$trade->currency];

                if(isset($users[$trade->createdBy])) $trade->createdBy = $users[$trade->createdBy];
                if(isset($users[$trade->editedBy]))  $trade->editedBy  = $users[$trade->editedBy];

                $trade->createdDate = substr($trade->createdDate, 0, 10);
                $trade->editedDate  = substr($trade->editedDate,  0, 10);

                if($trade->handlers)
                {
                    $tmpHandlers = array();
                    $handlers = explode(',', $trade->handlers);
                    foreach($handlers as $handler)
                    {
                        if(!$handler) continue;
                        $handler = trim($handler);
                        $tmpHandlers[] = isset($users[$handler]) ? $users[$handler] : $handler;
                    }

                    $trade->handlers = join("; \n", $tmpHandlers);
                }

                $trade->detail = join("; \n", $trade->detail);
            }

            $this->post->set('fields', $fields);
            $this->post->set('rows', $trades);
            $this->post->set('kind', 'trade');
            $this->fetch('file', 'export2CSV', $_POST);
        }

        $this->display();
    }

    /**
     * Report for trade.
     * 
     * @param  string $date 
     * @param  string $currency 
     * @access public
     * @return void
     */
    public function report($date = '', $currency = 'rmb')
    {
        $this->loadModel('report');
        $currencyList = $this->loadModel('common', 'sys')->getCurrencyList();

        $tradeYears  = array();
        $tradeMonths = array();
        $tradeDates = $this->trade->getDatePairs();
        foreach($tradeDates as $tradeDate)
        {
            $year  = substr($tradeDate, 0, 4);
            $month = substr($tradeDate, 5, 2);

            if(!in_array($year, $tradeYears)) $tradeYears[] = $year;

            if(!isset($tradeMonths[$year])) $tradeMonths[$year] = array();
            if(!in_array($month, $tradeMonths[$year])) $tradeMonths[$year][] = $month;

            sort($tradeMonths[$year]);
        }
        rsort($tradeYears);

        $currentYear  = current($tradeYears);
        $currentMonth = !empty($tradeMonths[$currentYear]) ? end($tradeMonths[$currentYear]) : '';
        if(!empty($date))
        {
            $currentYear  = substr($date, 0, 4);
            if(strlen($date) == 6) $currentMonth = substr($date, 4, 2);
        }

        $startDate = $currentYear . '-01-01';
        $endDate   = $currentYear . '-12-31';
        $trades = $this->dao->select('*, substr(date, 6, 2) as month')->from(TABLE_TRADE)->where('date')->ge($startDate)->andWhere('date')->lt($endDate)->andWhere('currency')->eq($currency)->orderBy('date_desc')->fetchGroup('month');
        
        $annualChartDatas = array();
        $annualChartDatas['all']['in']   = 0;
        $annualChartDatas['all']['out']  = 0;
        $annualChartDatas['all']['profit']  = 0;
        foreach($trades as $month => $monthTrades)
        {
            $annualChartDatas[$month]['in']  = 0;
            $annualChartDatas[$month]['out'] = 0;
            foreach($monthTrades as $trade)
            {
                if($trade->type == 'in')  $annualChartDatas[$month]['in']  += $trade->money;
                if($trade->type == 'out') $annualChartDatas[$month]['out'] += $trade->money;
            }
            $annualChartDatas[$month]['profit'] = $annualChartDatas[$month]['in'] - $annualChartDatas[$month]['out'];

            $annualChartDatas['all']['in']     += $annualChartDatas[$month]['in'];
            $annualChartDatas['all']['out']    += $annualChartDatas[$month]['out'];
            $annualChartDatas['all']['profit'] += $annualChartDatas[$month]['profit'];
        }
        ksort($annualChartDatas, SORT_STRING);

        $monthlyChartDatas['in']['category'] = $this->trade->getChartData('in', $currentYear, $currentMonth, 'category', $currency);
        $monthlyChartDatas['in']['category'] = $this->report->computePercent($monthlyChartDatas['in']['category']);
        $monthlyChartDatas['in']['dept']     = $this->trade->getChartData('in', $currentYear, $currentMonth, 'dept', $currency);
        $monthlyChartDatas['in']['dept']     = $this->report->computePercent($monthlyChartDatas['in']['dept']);

        $monthlyChartDatas['out']['category'] = $this->trade->getChartData('out', $currentYear, $currentMonth, 'category', $currency);
        $monthlyChartDatas['out']['category'] = $this->report->computePercent($monthlyChartDatas['out']['category']);
        $monthlyChartDatas['out']['dept']     = $this->trade->getChartData('out', $currentYear, $currentMonth, 'dept', $currency);
        $monthlyChartDatas['out']['dept']     = $this->report->computePercent($monthlyChartDatas['out']['dept']);

        $this->view->title             = $this->lang->trade->report;
        $this->view->annualChartDatas  = $annualChartDatas;
        $this->view->monthlyChartDatas = $monthlyChartDatas;
        $this->view->tradeYears        = $tradeYears;
        $this->view->tradeMonths       = $tradeMonths;
        $this->view->currentYear       = $currentYear;
        $this->view->currentMonth      = $currentMonth;
        $this->view->currencyList      = $currencyList;
        $this->view->currentCurrency   = $currency;
        $this->display();
    }
}
