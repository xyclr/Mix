<?php
/**
 * The model file of report module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     report
 * @version     $Id: model.php 4726 2013-05-03 05:51:27Z chencongzhi520@gmail.com $
 * @link        http://www.ranzhico.com
 */
?>
<?php
class reportModel extends model
{
    /**
     * Create single JSON. 
     * 
     * @param  array    $sets 
     * @param  array    $dateList 
     * @access public
     * @return string
     */
    public function createSingleJSON($sets, $dateList)
    {
        $data = '[';
        foreach($dateList as $i => $date)
        {
            $date = date('Y-m-d', strtotime($date));
            if(isset($sets[$date]))$data .= "[$i, {$sets[$date]->value}],";
        }
        $data = rtrim($data, ',');
        $data .= ']';
        return $data;
    }

    /**
     * Compute percent of every item.
     * 
     * @param  array    $datas 
     * @access public
     * @return array
     */
    public function computePercent($datas)
    {
        $sum = 0;
        foreach($datas as $data) $sum += $data->value;
        foreach($datas as $data) $data->percent = $sum == 0 ? 1 : round($data->value / $sum, 2);
        return $datas;
    }

    /**
     * Compute sum of datas.
     * 
     * @param  array    $datas 
     * @access public
     * @return array
     */
    public function computeSum($datas)
    {
        $sum = 0;
        foreach($datas as $data) $sum += $data->value;
        return $sum;
    }

    /**
     * Get System URL.
     * 
     * @access public
     * @return void
     */
    public function getSysURL()
    {
        /* Ger URL when run in shell. */
        if(PHP_SAPI == 'cli')
        {
            $url = parse_url(trim($this->server->argv[1]));
            $port = (empty($url['port']) or $url['port'] == 80) ? '' : $url['port'];
            $host = empty($port) ? $url['host'] : $url['host'] . ':' . $port;
            return $url['scheme'] . '://' . $host;
        }
        else
        {
            return common::getSysURL();
        }
    }

    /**
     * getChartData 
     * 
     * @param  string $module 
     * @param  string $chart 
     * @param  string $tableName 
     * @param  string $groupBy 
     * @param  string $currency '' 
     * @access public
     * @return void
     */
    public function getChartData($module, $chart, $tableName, $groupBy, $currency = '')
    {
        list($groupBy, $field, $func) = explode('|', $groupBy);
        if(empty($field)) $field = $groupBy;
        if(empty($func))  $func = 'count';

        /* process lang list. */
        if(isset($this->config->report->{$module}->listName[$chart]))
        {
            if($chart == 'productLine' or $chart == 'productLineA') $this->app->loadLang('product');

            $this->app->loadLang($module);
            $listName = $this->config->report->{$module}->listName[$chart];

            /* Set list. */
            if($listName == 'USERS')      $list = $this->loadModel('user')->getPairs('noempty');
            if($listName == 'AREA')       $list = $this->loadModel('tree')->getOptionMenu('area', 0, true);
            if($listName == 'INDUSTRY')   $list = $this->loadModel('tree')->getOptionMenu('industry', 0, true);
            if($listName == 'PRODUCTS')   $list = $this->loadModel('product', 'crm')->getPairs();
            if($listName == 'CUSTOMERS')  $list = $this->loadModel('customer', 'crm')->getPairs();
            if($listName == 'DEPOSITORS') $list = $this->loadModel('depositor')->getPairs();
            if(!isset($list))
            {
                if($chart == 'productLine' or $chart == 'productLineA')
                {
                    $list = $this->lang->product->lineList;
                }
                else
                {
                    $list = $this->lang->{$module}->{$listName};
                }
            }
        }

        if(strpos($groupBy, '_multi') !== false and !empty($list))
        {
            $datas   = array();
            $groupBy = str_replace('_multi', '', $groupBy);
            $field   = str_replace('_multi', '', $field);

            if(strpos($chart, 'productLine') !== false)
            {
                if($chart == 'productLine') $field = 'product';

                foreach($list as $key => $value)
                {
                    if($key == 'default') continue;
                    $productList = $this->dao->select('id')->from(TABLE_PRODUCT)->where('line')->eq($key)->fetchAll('id');

                    $data = new stdclass();
                    $data->name  = $key;
                    $data->value = 0; 
                    foreach($productList as $id => $product)
                    {
                        $count = $this->dao->select("$func($field) as value")->from($tableName)
                            ->where('product')->like("%,$id,%")
                            ->beginIf($currency != '')->andWhere('currency')->eq($currency)->fi()
                            ->fetch('value');

                        $data->value += $count; 
                    }

                    if($data->value != 0) $datas[$key] = $data;
                }
            }
            else
            {
                foreach($list as $key => $value)
                {
                    $count = $this->dao->select("$func($field) as value")->from($tableName)
                        ->where($groupBy)->like("%,$key,%")
                        ->beginIf($currency != '')->andWhere('currency')->eq($currency)->fi()
                        ->fetch('value');

                    $data = new stdclass();
                    $data->name  = $key;
                    $data->value = $count; 
                    if($count != 0) $datas[$key] = $data;
                }
            }
        }
        else
        {
            $datas = $this->dao->select("$groupBy as name, $func($field) as value")->from($tableName)
                ->beginIf($currency != '')->where('currency')->eq($currency)->fi()
                ->groupBy($groupBy)
                ->orderBy('value_desc')
                ->fetchAll('name');
        }

        /* Add names. */
        if(isset($this->config->report->{$module}->listName[$chart]))
        {
            foreach($datas as $name => $data) $data->name = isset($list[$name]) ? $list[$name] : $this->lang->report->undefined;
        }

        return $datas;
    }
}

/**
 * Sort summary. 
 * 
 * @param  array    $pre 
 * @param  array    $next 
 * @access public
 * @return int
 */
function sortSummary($pre, $next)
{
    if($pre['validRate'] == $next['validRate']) return 0;
    return $pre['validRate'] > $next['validRate'] ? -1 : 1;
}
