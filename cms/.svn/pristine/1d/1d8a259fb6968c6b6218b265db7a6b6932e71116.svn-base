<?php
/**
 * The model file of schema module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     schema
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class schemaModel extends model
{
    /**
     * Get schema by ID.
     * 
     * @param  int    $schemaID 
     * @access public
     * @return object
     */
    public function getByID($schemaID)
    {
        return $this->dao->select('*')->from(TABLE_SCHEMA)->where('id')->eq($schemaID)->fetch();
    }

    /**
     * Get schema pairs.
     * 
     * @access public
     * @return array
     */
    public function getPairs()
    {
        return $this->dao->select('id,name')->from(TABLE_SCHEMA)->fetchPairs('id', 'name');
    }

    /**
     * Get schema list.
     * 
     * @access public
     * @return array
     */
    public function getList()
    {
        return $this->dao->select('*')->from(TABLE_SCHEMA)->orderBy('id desc')->fetchAll('id');
    }

    /**
     * Create a schema 
     * 
     * @access public
     * @return int|bool
     */
    public function create()
    {
        $this->app->loadLang('trade', 'cash');
        $schema = array();
        if(!empty($_POST['schema']))
        {
            foreach($this->post->schema as $column => $fields)
            {
                foreach($fields as $field)
                {
                    if(empty($field)) continue;
                    if(isset($this->lang->trade->importedFields[$field])) $schema[$field][] = $column;
                }
            }
            $schema['money'] = array_unique(array_merge($schema['in'], $schema['out']));
            foreach($schema as $field => $columns) $schema[$field] = join(',', $columns);
        }
        $schema['name'] = $this->post->name;
        
        $this->dao->insert(TABLE_SCHEMA)
            ->data($schema, 'in,out')
            ->autoCheck()
            ->batchCheck($this->config->schema->require->create, 'notempty')
            ->exec();

        if(dao::isError()) return false;
        return $this->dao->lastInsertID();
    }

    /**
     * Update schema.
     * 
     * @param  int    $schemaID 
     * @access public
     * @return array
     */
    public function update($schemaID)
    {
        $oldSchema = $this->getByID($schemaID);
        $schema    = fixer::input('post')
            ->setIF($this->post->feeRow, 'fee', '')
            ->setIF($this->post->diffCol, 'money', "{$this->post->in},{$this->post->out}")
            ->remove('feeRow,diffCol')
            ->get();

        if($this->post->diffCol)$this->config->schema->require->edit = str_replace(',type,', ',in,out,', $this->config->schema->require->edit);
        $this->dao->update(TABLE_SCHEMA)->data($schema, 'in,out')
            ->autoCheck()
            ->batchCheck($this->config->schema->require->edit, 'notempty')
            ->where('id')->eq($schemaID)
            ->exec();

        if(!dao::isError()) return commonModel::createChanges($oldSchema, $schema);
        return false;
    }

    /**
     * Delete a schema.
     * 
     * @param  int      $schemaID 
     * @access public
     * @return bool
     */
    public function delete($schemaID, $null = null)
    {
        $schema = $this->getByID($schemaID);
        if(!$schema) return false;

        $this->dao->delete()->from(TABLE_SCHEMA)->where('id')->eq($schemaID)->exec();

        return !dao::isError();
    }

    /**
     * Parse CSV.
     * 
     * @param  string    $fileName 
     * @access public
     * @return array
     */
    public function parseCSV($fileName = '')
    {
        $handle = fopen($fileName, 'r');
        $col    = -1;
        $row    = 0;
        $data   = array();
        while(($line = fgets($handle)) !== false)
        {
            $line = trim($line);
            $line = preg_replace_callback('/(\"{2,})(\,+)/', array($this, 'removeInterference'), $line);
            $line = str_replace('""', '"', $line);

            /* if only one column then line is the data. */
            if(strpos($line, ',') === false and $col == -1)
            {
                $data[$row][0] = trim($line, '"');
            }
            else
            {
                /* if col is not -1, then the data of column is not end. */
                if($col != -1)
                {
                    $pos = strpos($line, '",');
                    if($pos === false)
                    {
                        $data[$row][$col] .= "\n" . $line;
                        continue;
                    }
                    else
                    {
                        $data[$row][$col] .= "\n" . substr($line, 0, $pos + 1);
                        $data[$row][$col] = str_replace('&comma;', ',', trim($data[$row][$col], '"'));
                        $line = substr($line, $pos + 2);
                        $col++;
                    }
                }

                if($col == -1) $col = 0;
                /* explode cols with delimiter. */
                while($line)
                {
                    /* the cell has '"', the delimiter is '",'. */
                    if($line{0} == '"')
                    {
                        $pos = strpos($line, '",');
                        if($pos === false)
                        {
                            $data[$row][$col] = $line;
                            /* if end of cell is not '"', then the data of cell is not end. */
                            if($line{strlen($line) - 1} != '"') continue 2;
                            $line = '';
                        }
                        else
                        {
                            $data[$row][$col] = substr($line, 0, $pos + 1);
                            $line = substr($line, $pos + 2);
                        }
                        $data[$row][$col] = trim($data[$row][$col], '"');
                    }
                    else
                    {
                        /* the delimiter default is ','. */
                        $pos = strpos($line, ',');
                        /* if line is not delimiter, then line is the data of cell. */
                        if($pos === false)
                        {
                            $data[$row][$col] = $line;
                            $line = '';
                        }
                        else
                        {
                            $data[$row][$col] = substr($line, 0, $pos);
                            $line = substr($line, $pos + 1);
                        }
                    }

                    $data[$row][$col] = str_replace('&comma;', ',', trim($data[$row][$col], '"'));
                    $col++;
                }
            }
            $row ++;
            $col = -1;
        }
        fclose ($handle);

        return $data;
    }

    /**
     * Remove interference for parse csv.
     * 
     * @param  array    $matchs 
     * @access private
     * @return string
     */
    private function removeInterference($matchs)
    {
        return $matchs[1] . str_replace(',', '&comma;', $matchs[2]);
    }
}
