<?php
/**
 * The model file of block module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     block
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class blockModel extends model
{
    /**
     * Save params 
     * 
     * @param  int    $index 
     * @param  string $type 
     * @param  string $appName 
     * @param  int    $blockID 
     * @access public
     * @return void
     */
    public function save($index, $type = 'system', $appName = 'sys', $blockID = 0)
    {
        $data = fixer::input('post')
            ->add('account', $this->app->user->account)
            ->add('order', $index)
            ->add('app', $appName)
            ->add('hidden', 0)
            ->setIF($type != 'system', 'block', $type)
            ->setIF($blockID, 'id', $blockID)
            ->setDefault('grid', '4')
            ->setDefault('source', $appName)
            ->setDefault('params', array())
            ->get();

        if($type != 'system') $data->source = '';
        if($type == 'html')
        {
            $data->params['html'] = $data->html;
            unset($data->html);
        }
        $data->params = helper::jsonEncode($data->params);

        $this->dao->replace(TABLE_BLOCK)->data($data, 'uid')->exec();
    }

    /**
     * Get content for entry block.
     * 
     * @param  object    $block 
     * @access public
     * @return string
     */
    public function getEntry($block)
    {
        if(empty($block)) return false;
        $entry = $this->loadModel('entry')->getByCode($block->source);
        $http  = $this->app->loadClass('http');

        if(empty($block->params)) $block->params = new stdclass();

        $block->params->account = $this->app->user->account;
        $block->params->uid     = $this->app->user->id;
        $params = base64_encode(json_encode($block->params));

        $query['mode']    = 'getblockdata';
        $query['blockid'] = $block->block;
        $query['hash']    = $entry->key;
        $query['entry']   = $entry->id;
        $query['app']     = 'sys';
        $query['lang']    = $this->app->getClientLang();
        $query['sso']     = base64_encode(commonModel::getSysURL() . helper::createLink('entry', 'visit', "entry=$entry->id"));
        $query['user']    = $this->app->user->account;
        if(isset($params)) $query['param'] = $params;

        $query     = http_build_query($query);
        $parsedUrl = parse_url($entry->block);
        $parsedUrl['query'] = empty($parsedUrl['query']) ? $query : $parsedUrl['query'] . "&" . $query;

        $link = '';
        if(!isset($parsedUrl['scheme'])) 
        {
            $link  = commonModel::getSysURL() . $parsedUrl['path'];
            $link .= '?' . $parsedUrl['query'];
        }
        else
        {
            $link .= $parsedUrl['scheme'] . '://' . $parsedUrl['host'];
            if(isset($parsedUrl['port'])) $link .= ':' . $parsedUrl['port']; 
            if(isset($parsedUrl['path'])) $link .= $parsedUrl['path']; 
            $link .= '?' . $parsedUrl['query'];
        }

        /* Send login request. */
        $loginObj = "<iframe src=" . helper::createLink('sys.entry', 'visit', "entryID={$entry->id}") . "' class='hidden' />";
        return $loginObj . $http->get($link);
    }

    /**
     * Get content when type is rss 
     * 
     * @param  object    $block 
     * @access public
     * @return string
     */
    public function getRss($block)
    {
        if(empty($block)) return false;
        $http = $this->app->loadClass('http');

        $xml = $http->get(htmlspecialchars_decode($block->params->link));

        $xpc = xml_parser_create();
        xml_parse_into_struct($xpc, $xml, $values);
        xml_parser_free($xpc);

        $channelTags = array();
        $itemTags    = array();
        $inItem      = false;
        foreach($values as $value)
        {
            $tag = strtolower($value['tag']);
            if($value['tag'] == 'ITEM' and $value['type'] == 'open')  $inItem = true;
            if($value['tag'] == 'ITEM' and $value['type'] == 'close') $inItem = false;

            /* The level of text node is 3 in channel. */
            if(!$inItem and $value['type'] == 'complete' and $value['level'] == 3) $channelTags[$tag] = isset($value['value']) ? $value['value'] : '';
            /* The level of text node is 4 in item. */
            if($inItem  and $value['type'] == 'complete' and $value['level'] == 4) $itemTags[$tag][]  = isset($value['value']) ? $value['value'] : '';
        }

        $maxNum = $block->params->num == 0 ? count(current($itemTags)) : $block->params->num;
        $html   = "<div class='list-group'>";
        for($i = 0; $i < $maxNum; $i++)
        {
            $title = '';
            foreach(array_keys($itemTags) as $tag)
            {
                if($tag == 'title')
                {
                    $title = $itemTags[$tag][$i];
                }
                elseif($tag == 'pubdate')
                {
                    $time = date('n-j H:s',strtotime($itemTags[$tag][$i]));
                    $html .= "<a class='list-group-item' target='_blank' href='{$itemTags['link'][$i]}'><small class='text-muted pull-right'>{$time}</small><h5 class='list-group-item-heading small text-ellipsis'>{$title}</h5></a>";
                }
            }
        }

        return $html . '</div>';
    }

    /**
     * Get block by ID.
     * 
     * @param  int    $blockID 
     * @access public
     * @return object
     */
    public function getByID($blockID)
    {
        $block = $this->dao->select('*')->from(TABLE_BLOCK)
            ->where('id')->eq($blockID)
            ->fetch();
        if(empty($block)) return false;

        $block->params = json_decode($block->params);
        if(empty($block->params)) $block->params = new stdclass();
        return $block;
    }

    /**
     * Get saved block config.
     * 
     * @param  int    $index 
     * @access public
     * @return object
     */
    public function getBlock($index, $appName = 'sys')
    {
        $block = $this->dao->select('*')->from(TABLE_BLOCK)
            ->where('`order`')->eq($index)
            ->andWhere('account')->eq($this->app->user->account)
            ->andWhere('app')->eq($appName)
            ->fetch();
        if(empty($block)) return false;

        $block->params = json_decode($block->params);
        if(empty($block->params)) $block->params = new stdclass();
        return $block;
    }

    /**
     * Get last key.
     * 
     * @param  string $appName 
     * @access public
     * @return int
     */
    public function getLastKey($appName = 'sys')
    {
        $index = $this->dao->select('`order`')->from(TABLE_BLOCK)
            ->where('app')->eq($appName)
            ->andWhere('account')->eq($this->app->user->account)
            ->orderBy('order desc')
            ->limit(1)
            ->fetch('order');
        return $index ? $index : 0;
    }

    /**
     * Get block list for account.
     * 
     * @param  string $appName 
     * @access public
     * @return void
     */
    public function getBlockList($appName = 'sys')
    {
        $blocks = $this->dao->select('*')->from(TABLE_BLOCK)->where('account')->eq($this->app->user->account)
            ->andWhere('app')->eq($appName)
            ->andWhere('hidden')->eq(0)
            ->orderBy('`order`')
            ->fetchAll('order');

        foreach($blocks as $key => $block)
        {
            if($block->block == 'html' or $block->block == 'allEntries') continue;

            $module = $block->block;
            $method = 'browse';
            if(strpos('blog, project', $block->block) !== false) $method = 'index';
            if($block->block == 'attend') $method = 'personal';
            if($block->block == 'thread')
            {
                $module = 'forum';
                $method = 'board';
            }
            if(!commonModel::hasPriv($module, $method)) unset($blocks[$key]);
        }
        return $blocks;
    }

    /**
     * Get hidden blocks
     * 
     * @access public
     * @return array
     */
    public function getHiddenBlocks()
    {
        return $this->dao->select('*')->from(TABLE_BLOCK)->where('account')->eq($this->app->user->account)
            ->andWhere('app')->eq('sys')
            ->andWhere('hidden')->eq(1)
            ->orderBy('`order`')
            ->fetchAll('order');
    }

    /**
     * Init block when account use first. 
     * 
     * @param  string    $appName 
     * @access public
     * @return bool
     */
    public function initBlock($appName)
    {
        $this->app->loadLang('block', 'sys');
        $blocks  = $this->lang->block->default[$appName];
        $account = $this->app->user->account;

        /* Mark this app has init. */
        $this->loadModel('setting')->setItem("$account.$appName.common.blockInited", true);
        foreach($blocks as $index => $block)
        {
            $block['order']   = $index;
            $block['app']     = $appName;
            $block['account'] = $account;
            $block['params']  = helper::jsonEncode($block['params']);
            if(!isset($block['source'])) $block['source'] = $appName;

            $this->dao->replace(TABLE_BLOCK)->data($block)->exec();
        }

        return !dao::isError();
    }
}
