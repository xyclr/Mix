<?php
/**
 * The model file of doc module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     doc 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php
class docModel extends model
{
    /**
     * Get library by id.
     * 
     * @param  int    $libID 
     * @access public
     * @return object
     */
    public function getLibById($libID)
    {
        return $this->dao->findByID($libID)->from(TABLE_DOCLIB)->fetch();
    }

    /**
     * Get libraries.
     * 
     * @access public
     * @return array
     */
    public function getLibList()
    {
        $libs = $this->dao->select('id, name')->from(TABLE_DOCLIB)->where('deleted')->eq(0)->fetchPairs();
        return $this->lang->doc->systemLibs + $libs;
    }
    
    /**
     * Get left menus.
     * 
     * @param  mix    $libs 
     * @access public
     * @return void
     */
    public function getSubMenus($libs = null)
    {
        if(empty($libs)) $libs = $this->getLibList();

        $libMenu = array();

        foreach($libs as $id => $libName)
        {
            $libID = isset($this->lang->doc->systemLibs[$id]) ? $id : 'lib' . $id;
            $libMenu[$libID] = "$libName|doc|browse|libID=$id";
        }

        $libMenu += (array)$this->lang->doc->menu;

        return (object)$libMenu;
    }

    /**
     * Create a library.
     * 
     * @access public
     * @return void
     */
    public function createLib()
    {
        $lib = fixer::input('post')->stripTags('name')->get();
        $this->dao->insert(TABLE_DOCLIB)
            ->data($lib)
            ->autoCheck()
            ->batchCheck('name', 'notempty')
            ->check('name', 'unique')
            ->exec();
        return $this->dao->lastInsertID();
    }

    /**
     * Update a library.
     * 
     * @param  int    $libID 
     * @access public
     * @return void
     */
    public function updateLib($libID)
    {
        $libID  = (int)$libID;
        $oldLib = $this->getLibById($libID);
        $lib    = fixer::input('post')->stripTags('name')->get();

        $this->dao->update(TABLE_DOCLIB)
            ->data($lib)
            ->autoCheck()
            ->batchCheck('name', 'notempty')
            ->check('name', 'unique', "id != $libID")
            ->where('id')->eq($libID)
            ->exec();

        if(!dao::isError()) return commonModel::createChanges($oldLib, $lib);
    }

    /**
     * Delete a lib.
     * 
     * @param  int      $tradeID 
     * @access public
     * @return void
     */
    public function deleteLib($libID)
    {
        $this->dao->delete()->from(TABLE_DOCLIB)->where('id')->eq($libID)->exec();
        return !dao::isError();
    }

    /**
     * Get docs.
     * 
     * @param  int|string   $libID 
     * @param  int          $productID 
     * @param  int          $projectID 
     * @param  int          $module 
     * @param  string       $orderBy 
     * @param  object       $pager 
     * @access public
     * @return void
     */
    public function getDocList($libID, $productID, $projectID, $module, $orderBy, $pager)
    {
        $products = $this->loadModel('product', 'crm')->getPairs();
        $projects = array();
        //$projects = $this->loadModel('project')->getPairs();

        $keysOfProducts = array_keys($products);
        $keysOfProjects = array_keys($projects);
        $allKeysOfProjects = $keysOfProjects;
        $allKeysOfProjects[] = 0;

        if(strpos($orderBy, 'id') === false) $orderBy .= ', id_desc';

        return $this->dao->select('*')->from(TABLE_DOC)
            ->where('deleted')->eq(0)
            ->beginIF(is_numeric($libID))->andWhere('lib')->eq($libID)->fi()
            ->beginIF($libID == 'product')->andWhere('product')->in($keysOfProducts)->andWhere('project')->in($allKeysOfProjects)->fi()
            ->beginIF($libID == 'project')->andWhere('project')->in($keysOfProjects)->fi()
            ->beginIF($productID > 0)->andWhere('product')->eq($productID)->fi()
            ->beginIF($projectID > 0)->andWhere('project')->eq($projectID)->fi()
            ->beginIF((string)$projectID == 'int')->andWhere('project')->gt(0)->fi()
            ->beginIF($module)->andWhere('module')->in($module)->fi()
            ->orderBy($orderBy)
            ->page($pager)
            ->fetchAll();
    }

    /**
     * get doc list by search.
     * 
     * @param  string $orderBy 
     * @param  string $pager 
     * @access public
     * @return array
     */
    public function getDocListBySearch($orderBy, $pager)
    {
        if($this->session->docQuery == false) $this->session->set('docQuery', ' 1 = 1');
        $docQuery = $this->loadModel('search', 'sys')->replaceDynamic($this->session->docQuery);

        return $this->dao->select('*')->from(TABLE_DOC)
            ->where('deleted')->eq(0)
            ->andWhere($docQuery)
            ->orderBy($orderBy)
            ->page($pager)
            ->fetchAll();
    }

    /**
     * Get doc info by id.
     * 
     * @param  int    $docID 
     * @param  bool   $setImgSize 
     * @access public
     * @return void
     */
    public function getById($docID, $setImgSize = false)
    {
        $doc = $this->dao->select('*')
            ->from(TABLE_DOC)
            ->where('id')->eq((int)$docID)
            ->fetch();
        if(!$doc) return false;
        $doc->files = $this->loadModel('file')->getByObject('doc', $docID);

        $doc->libName     = '';
        $doc->productName = '';
        $doc->projectName = '';
        $doc->moduleName  = '';
        if($doc->lib)     $doc->libName     = $this->dao->findByID($doc->lib)->from(TABLE_DOCLIB)->fetch('name');
        if($doc->product) $doc->productName = $this->dao->findByID($doc->product)->from(TABLE_PRODUCT)->fetch('name');
        if($doc->project) $doc->projectName = $this->dao->findByID($doc->project)->from(TABLE_PROJECT)->fetch('name');
        if($doc->module)  $doc->moduleName  = $this->dao->findByID($doc->module)->from(TABLE_CATEGORY)->fetch('name');
        return $doc;
    }

    /**
     * Create a doc.
     * 
     * @access public
     * @return void
     */
    public function create()
    {
        $now = helper::now();
        $doc = fixer::input('post')
            ->add('createdBy', $this->app->user->account)
            ->add('createdDate', $now)
            ->setDefault('product, project, module', 0)
            ->specialChars('title, digest, keywords')
            ->encodeURL('url')
            ->stripTags('content', $this->config->allowedTags->admin)
            ->cleanInt('product, project, module')
            ->remove('files,labels,uid')
            ->get();

        $condition = "lib = '$doc->lib' AND module = $doc->module";
        $this->dao->insert(TABLE_DOC)
            ->data($doc)
            ->autoCheck()
            ->batchCheck($this->config->doc->require->create, 'notempty')
            ->check('title', 'unique', $condition)
            ->exec();

        if(!dao::isError())
        {
            $docID = $this->dao->lastInsertID();
            $this->loadModel('file')->saveUpload('doc', $docID);
            return $docID;
        }
        return false;
    }

    /**
     * Update a doc.
     * 
     * @param  int    $docID 
     * @access public
     * @return void
     */
    public function update($docID)
    {
        $oldDoc = $this->getById($docID);
        $doc = fixer::input('post')
            ->cleanInt('module')
            ->setDefault('module', 0)
            ->specialChars('title, digest, keywords')
            ->encodeURL('url')
            ->stripTags('content', $this->config->allowedTags->admin)
            ->add('editedBy',   $this->app->user->account)
            ->add('editedDate', helper::now())
            ->remove('comment,files,labels,uid')
            ->get();

        $uniqueCondition = "lib = '{$oldDoc->lib}' AND module = {$doc->module} AND id != $docID";
        $this->dao->update(TABLE_DOC)->data($doc)
            ->autoCheck()
            ->batchCheck($this->config->doc->require->edit, 'notempty')
            ->check('title', 'unique', $uniqueCondition)
            ->where('id')->eq((int)$docID)
            ->exec();

        if(!dao::isError()) return commonModel::createChanges($oldDoc, $doc);
    }
 
    /**
     * Get docs of a product.
     * 
     * @param  int    $productID 
     * @access public
     * @return array
     */
    public function getProductDocList($productID)
    {
        return $this->dao->select('t1.*, t2.name as module')
            ->from(TABLE_DOC)->alias('t1')
            ->leftjoin(TABLE_CATEGORY)->alias('t2')->on('t1.module = t2.id')
            ->where('t1.product')->eq($productID)
            ->andWhere('t1.deleted')->eq(0)
            ->orderBy('t1.id_desc')
            ->fetchAll();
    }

    /**
     * Get docs of a project.
     * 
     * @param  int    $projectID 
     * @access public
     * @return array
     */
    public function getProjectDocList($projectID)
    {
        return $this->dao->findByProject($projectID)->from(TABLE_DOC)->andWhere('deleted')->eq(0)->orderBy('id_desc')->fetchAll();
    }

    /**
     * Get pairs of product modules.
     * 
     * @access public
     * @return array
     */
    public function getProductCategoryPairs()
    {
        return $this->dao->findByType('productdoc')->from(TABLE_CATEGORY)->fetchPairs('id', 'name');
    }

    /**
     * Get pairs of project modules.
     * 
     * @access public
     * @return array
     */
    public function getProjectModulePairs()
    {
        return $this->dao->findByType('projectdoc')->from(TABLE_CATEGORY)->andWhere('type')->eq('projectdoc')->fetchPairs('id', 'name');
    }

    /**
     * Extract css styles for tables created in kindeditor.
     *
     * Like this: <table class="ke-table1" style="width:100%;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * 
     * @param  string    $content 
     * @access public
     * @return void
     */
    public function extractKETableCSS($content)
    {
        $css = '';
        $rule = '/<table class="ke(.*)" .*/';
        if(preg_match_all($rule, $content, $results))
        {
            foreach($results[0] as $tableLine)
            {
                $attributes = explode(' ', str_replace('"', '', $tableLine));
                foreach($attributes as $attribute)
                {
                    if(strpos($attribute, '=') === false) continue;
                    list($attributeName, $attributeValue) = explode('=', $attribute);
                    $$attributeName = trim(str_replace('>', '', $attributeValue));
                }

                if(!isset($class)) continue;
                $className   = $class;
                $borderSize  = isset($border)      ? $border . 'px' : '1px';
                $borderColor = isset($bordercolor) ? $bordercolor : 'gray';
                $borderStyle = "{border:$borderSize $borderColor solid}\n";
                $css .= ".$className$borderStyle";
                $css .= ".$className td$borderStyle";
            }
        }
        return $css;
    }
}
