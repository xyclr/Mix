<?php
/**
 * The model file of holiday module of ranzhi.
 *
 * @copyright   Copyright 2009-2015 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL 
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     holiday
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class holidayModel extends model
{
    /**
     * Get holiday by id. 
     * 
     * @param  int    $id 
     * @access public
     * @return object
     */
    public function getById($id)
    {
        return $this->dao->select('*')->from(TABLE_HOLIDAY)->where('id')->eq($id)->fetch();
    }

    /**
     * Get holiday list. 
     * 
     * @param  string $year 
     * @access public
     * @return array
     */
    public function getList($year = '')
    {
        return $this->dao->select('*')->from(TABLE_HOLIDAY)
            ->beginIf($year != '')->where('year')->eq($year)->fi()
            ->fetchAll('id');
    }

    /**
     * check a date is in holiday. 
     * 
     * @param  int    $date 
     * @access public
     * @return bool
     */
    public function isHoliday($date)
    {
        static $holidayList = null;
        if($holidayList == null)
        {
            $year = substr($date, 0, 4);
            $holidayList = $this->getList($year);
        }

        $result = false;
        foreach($holidayList as $holiday)
        {
            if(strtotime($date) >= strtotime($holiday->begin) and strtotime($date) <= strtotime($holiday->end))
            {
                $result = true;
                break;
            }
        }
        return $result;
    }

    /**
     * Get year pairs. 
     * 
     * @access public
     * @return array
     */
    public function getYearPairs()
    {
        return $this->dao->select('year,year')->from(TABLE_HOLIDAY)->groupBy('year')->orderBy('year_desc')->fetchPairs();
    }

    /**
     * create a holiday.
     * 
     * @access public
     * @return bool
     */
    public function create()
    {
        $holiday = fixer::input('post')->get();
        $holiday->year = substr($holiday->begin, 0, 4);

        $this->dao->insert(TABLE_HOLIDAY)
            ->data($holiday)
            ->autoCheck()
            ->batchCheck($this->config->holiday->require->create, 'notempty')
            ->check('end', 'ge', $holiday->begin)
            ->exec();
        return !dao::isError();
    }

    /**
     * Edit holiday. 
     * 
     * @access public
     * @return bool
     */
    public function update($id)
    {
        $holiday = fixer::input('post')->get();
        $holiday->year = substr($holiday->begin, 0, 4);

        $this->dao->update(TABLE_HOLIDAY)
            ->data($holiday)
            ->autoCheck()
            ->batchCheck($this->config->holiday->require->edit, 'notempty')
            ->check('end', 'ge', $holiday->begin)
            ->where('id')->eq($id)
            ->exec();
        return !dao::isError();
    }

    /**
     * Delete a holiday 
     * 
     * @param  int    $id 
     * @param  null $null 
     * @access public
     * @return bool
     */
    public function delete($id, $null = null)
    {
        $this->dao->delete()->from(TABLE_HOLIDAY)->where('id')->eq($id)->exec();
        return !dao::isError();
    }
}

