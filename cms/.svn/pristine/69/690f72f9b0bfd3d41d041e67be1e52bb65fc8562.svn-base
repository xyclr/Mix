<?php
/**
 * The control file of doc module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     doc 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class doc extends control
{
    /**
     * Construct function, load user, tree, action auto.
     * 
     * @access public
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        $this->libs = $this->doc->getLibList();

        $this->loadModel('user');
        $this->loadModel('tree');
        $this->loadModel('action');
        //$this->loadModel('product', 'crm');
        //$this->loadModel('project');

        $this->lang->doc->menu = $this->doc->getSubMenus($this->libs);
    }

    /**
     * Go to browse page.
     * 
     * @access public
     * @return void
     */
    public function index()
    {
        $this->locate(inlink('browse'));
    }

    /**
     * Browse docs.
     * 
     * @param  string|int $libID    product|project or the int id of custom library
     * @param  int    $moduleID 
     * @param  int    $productID 
     * @param  int    $projectID 
     * @param  string $browseType 
     * @param  int    $param 
     * @param  string $orderBy 
     * @param  int    $recTotal 
     * @param  int    $recPerPage 
     * @param  int    $pageID 
     * @access public
     * @return void
     */
    public function browse($libID = '0', $moduleID = 0, $productID = 0, $projectID = 0, $browseType = 'byModule', $param = 0, $orderBy = 'id_desc', $recTotal = 0, $recPerPage = 20, $pageID = 1)
    {  
        $libID = $libID ? $libID : key((array)$this->libs);
        if(!$libID) $this->locate(inlink('createLib'));

        /* Set browseType.*/ 
        $browseType = strtolower($browseType);
        $queryID    = ($browseType == 'bysearch') ? (int)$param : 0;

        /* Set menu, save session. */
        $this->session->set('docList', $this->app->getURI(true));

        /* Load pager. */
        $this->app->loadClass('pager', $static = true);
        $pager = new pager($recTotal, $recPerPage, $pageID);
 
        /* Get docs. */
        $modules = 0;
        $docs    = array();
        if($browseType == "bymodule")
        {
            $type = is_numeric($libID) ? 'customerdoc' : $libID . 'doc';
            if($moduleID) $modules = $this->tree->getFamily($moduleID, $type, (int)$libID);
            $docs = $this->doc->getDocList($libID, $productID, $projectID, $modules, $orderBy, $pager);
        }
        elseif($browseType == 'bysearch')
        {
            $docs = $this->doc->getDocListBySearch($orderBy, $pager);
        }

        /* Get the tree menu. */
        if($libID == 'product')
        {
            $moduleTree = $this->tree->getProductDocTreeMenu();
        }
        elseif($libID == 'project')
        {
            $moduleTree = $this->tree->getProjectDocTreeMenu();
        }
        else
        {
            $moduleTree = $this->tree->getTreeMenu($type = 'customdoc', $startModuleID = 0, array('treeModel', 'createDocLink'), $libID);
        }

        /* Build the search form. */
        $this->loadModel('search', 'sys');
        $this->config->doc->search['actionURL'] = $this->createLink('doc', 'browse', "libID=$libID&moduleID=$moduleID&procuctID=$productID&projectID=$projectID&browseType=bySearch");
        $this->config->doc->search['params']['lib']['values']    = array('' => '') + $this->libs;
        $this->config->doc->search['params']['type']['values']   = array('' => '') + $this->config->doc->search['params']['type']['values'];
        $this->config->doc->search['params']['module']['values'] = array('' => '') + $this->tree->getOptionMenu('customdoc', $startModuleID = 0, false, $libID);
        $this->search->setSearchParams($this->config->doc->search);
       
        $this->view->title         = $this->lang->doc->common . $this->lang->colon . $this->libs[$libID];
        $this->view->libID         = $libID;
        $this->view->libName       = $this->libs[$libID];
        $this->view->moduleID      = $moduleID;
        $this->view->moduleTree    = $moduleTree;
        $this->view->parentModules = $this->tree->getFamily($moduleID);
        $this->view->docs          = $docs;
        $this->view->pager         = $pager;
        $this->view->users         = $this->loadModel('user')->getPairs('noletter');
        $this->view->orderBy       = $orderBy;
        $this->view->productID     = $productID;
        $this->view->projectID     = $projectID;
        $this->view->browseType    = $browseType;
        $this->view->param         = $param;
        $this->view->mode          = $browseType;

        $this->display();
    }

    /**
     * Create a library.
     * 
     * @access public
     * @return void
     */
    public function createLib()
    {
        if(!empty($_POST))
        {
            $libID = $this->doc->createLib();
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));

            $this->loadModel('action')->create('docLib', $libID, 'Created');
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('browse', "libID=$libID")));
        }

        $this->view->title = $this->lang->doc->createLib;
        $this->display();
    }

    /**
     * Edit a library.
     * 
     * @param  int    $libID 
     * @access public
     * @return void
     */
    public function editLib($libID)
    {
        if(!empty($_POST))
        {
            $changes = $this->doc->updateLib($libID); 
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));

            if($changes)
            {
                $actionID = $this->loadModel('action')->create('docLib', $libID, 'edited');
                $this->action->logHistory($actionID, $changes);
            }
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('browse', "libID=$libID")));
        }
        
        $lib = $this->doc->getLibByID($libID);
        $this->view->libName = empty($lib) ? $libID : $lib->name;
        $this->view->libID   = $libID;
        $this->view->title   = $this->lang->doc->editLib;
        
        $this->display();
    }

    /**
     * Delete a library.
     * 
     * @param  int    $libID 
     * @access public
     * @return void
     */
    public function deleteLib($libID)
    {
        if($libID == 'product' or $libID == 'project') die();

        if($this->doc->deleteLib($libID)) $this->send(array('result' => 'success', 'locate' => inlink('browse')));
        $this->send(array('result' => 'fail', 'message' => dao::getError()));
    }
    
    /**
     * Create a doc.
     * 
     * @param  int|string   $libID 
     * @param  int          $moduleID 
     * @param  int          $productID 
     * @param  int          $projectID 
     * @param  string       $from 
     * @access public
     * @return void
     */
    public function create($libID, $moduleID = 0, $productID = 0, $projectID = 0, $from = 'doc')
    {
        $projectID = (int)$projectID;
        if(!empty($_POST))
        {
            $docID = $this->doc->create();
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));

            $this->action->create('doc', $docID, 'Created');

            if($from == 'product') $link = $this->createLink('product', 'doc', "productID={$this->post->product}");
            if($from == 'project') $link = $this->createLink('project', 'doc', "projectID={$this->post->project}");
            if($from == 'doc')
            {
                $productID = intval($this->post->product);
                $projectID = intval($this->post->project);
                $vars = "libID=$libID&moduleID={$this->post->module}&productID=$productID&projectID=$projectID";
                $link = $this->createLink('doc', 'browse', $vars);
            }
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => $link));
        }

        /* Get the modules. */
        if($libID == 'product' or $libID == 'project')
        {
            $moduleOptionMenu = $this->tree->getOptionMenu($libID . 'doc', $startModuleID = 0);
        }
        else
        {
            $moduleOptionMenu = $this->tree->getOptionMenu('customdoc', $startModuleID = 0, false, $libID);
        }

        $this->view->title            = $this->libs[$libID] . $this->lang->colon . $this->lang->doc->create;
        $this->view->libID            = $libID;
        $this->view->moduleOptionMenu = $moduleOptionMenu;
        $this->view->moduleID         = $moduleID;
        $this->view->productID        = $productID;
        $this->view->projectID        = $projectID;
        $this->view->products         = array();
        //$this->view->products         = $projectID == 0 ? $this->product->getPairs() : $this->project->getProducts($projectID);
        $this->view->projects         = array();
        //$this->view->projects         = $this->project->getPairs('all');

        $this->display();
    }

    /**
     * Edit a doc.
     * 
     * @param  int    $docID 
     * @access public
     * @return void
     */
    public function edit($docID)
    {
        if(!empty($_POST))
        {
            $changes  = $this->doc->update($docID);
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $files = $this->loadModel('file')->saveUpload('doc', $docID);
            if($this->post->comment != '' or !empty($changes) or !empty($files))
            {
                $action = !empty($changes) ? 'Edited' : 'Commented';
                $fileAction = '';
                if(!empty($files)) $fileAction = $this->lang->addFiles . join(',', $files) . "\n" ;
                $actionID = $this->action->create('doc', $docID, $action, $fileAction . $this->post->comment);
                if($changes) $this->action->logHistory($actionID, $changes);
            }
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => $this->createLink('doc', 'view', "docID=$docID")));
        }

        /* Get doc and set menu. */
        $doc   = $this->doc->getById($docID);
        $libID = $doc->lib;

        /* Get modules. */
        if($libID == 'product' or $libID == 'project')
        {
            $moduleOptionMenu = $this->tree->getOptionMenu($libID . 'doc', $startModuleID = 0);
        }
        else
        {
            $moduleOptionMenu = $this->tree->getOptionMenu('customdoc', $startModuleID = 0, false, $libID);
        }

        $this->view->title            = $this->libs[$libID] . $this->lang->colon . $this->lang->doc->edit;
        $this->view->doc              = $doc;
        $this->view->libID            = $libID;
        $this->view->moduleOptionMenu = $moduleOptionMenu;
        $this->display();
    }

    /**
     * View a doc.
     * 
     * @param  int    $docID 
     * @access public
     * @return void
     */
    public function view($docID)
    {
        /* Get doc. */
        $doc = $this->doc->getById($docID, true);
        if(!$doc) die(js::error($this->lang->doc->notFound) . js::locate('back'));
        if($doc->project != 0 and !$this->project->checkPriv($this->project->getById($doc->project)))
        {
            echo(js::alert($this->lang->error->accessDenied));
            die(js::locate('back'));
        }

        /* Get library. */
        $lib = $doc->libName;
        if($doc->lib == 'product') $lib = $doc->productName;
        if($doc->lib == 'project') $lib = $doc->productName . $this->lang->arrow . $doc->projectName;

        $this->view->title      = "DOC #$doc->id $doc->title - " . $this->libs[$doc->lib];
        $this->view->doc        = $doc;
        $this->view->lib        = $lib;
        $this->view->users      = $this->user->getPairs('noclosed,noletter');
        $this->view->keTableCSS = $this->doc->extractKETableCSS($doc->content);

        $this->display();
    }

    /**
     * Delete a doc.
     * 
     * @param  int    $docID 
     * @param  string $confirm  yes|no
     * @access public
     * @return void
     */
    public function delete($docID)
    {
        $this->doc->delete(TABLE_DOC, $docID);
        if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
        $this->send(array('result' => 'success', 'locate' => inlink('browse')));
    }
}
