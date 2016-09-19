<?php
/**
 * The model file of package module of Ranzhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     package
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class packageModel extends model
{
    /**
     * The package manager version. Don't change it. 
     */
    const EXT_MANAGER_VERSION = '1.3';

    /**
     * The api agent(use snoopy).
     * 
     * @var object   
     * @access public
     */
    public $agent;

    /**
     * The api root.
     * 
     * @var string
     * @access public
     */
    public $apiRoot;

    /**
     * The construct function.
     * 
     * @access public
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->setAgent();
        $this->setApiRoot();
        $this->classFile = $this->app->loadClass('zfile');
    }

    /**
     * Set the api agent.
     * 
     * @access public
     * @return void
     */
    public function setAgent()
    {
        $this->agent = $this->app->loadClass('snoopy');
    }

    /**
     * Set the apiRoot.
     * 
     * @access public
     * @return void
     */
    public function setApiRoot()
    {
        $this->apiRoot = $this->config->package->apiRoot;
    }

    /**
     * Fetch data from an api.
     * 
     * @param  string    $url 
     * @access public
     * @return mixed
     */
    public function fetchAPI($url)
    {
        $url .= '?lang=' . str_replace('-', '_', $this->app->getClientLang()) . '&managerVersion=' . self::EXT_MANAGER_VERSION . '&ranzhiVersion=' . $this->config->version;
        $this->agent->fetch($url);
        $result = json_decode($this->agent->results);

        if(!isset($result->status)) return false;
        if($result->status != 'success') return false;
        if(isset($result->data) and md5($result->data) != $result->md5) return false;
        if(isset($result->data)) return json_decode($result->data);
    }

    /**
     * Get package modules from the api.
     * 
     * @access public
     * @return string|bool
     */
    public function getModulesByAPI()
    {
        $requestType = helper::safe64Encode($this->config->requestType);
        $webRoot     = helper::safe64Encode($this->config->webRoot);
        $apiURL      = $this->apiRoot . 'apiGetmodules-' . $requestType . '-' . $webRoot . '.json';

        $data = $this->fetchAPI($apiURL);
        if(isset($data->modules)) return $data->modules;
        return false;
    }

    /**
     * Get packages by some condition.
     * 
     * @param  string    $type 
     * @param  mixed     $param 
     * @access public
     * @return array|bool
     */
    public function getPackagesByAPI($type, $param, $recTotal = 0, $recPerPage = 20, $pageID = 1)
    {
        $apiURL = $this->apiRoot . "apiGetExtensions-$type-$param-$recTotal-$recPerPage-$pageID.json";
        $data   = $this->fetchAPI($apiURL);

        if(isset($data->extensions))
        {
            foreach($data->extensions as $package)
            {
                $package->currentRelease = isset($package->compatibleRelease) ? $package->compatibleRelease : $package->latestRelease;
                $package->currentRelease->compatible = isset($package->currentRelease);
            }
            return $data;
        }
        return false;
    }

    /**
     * Get versions for some packages.
     * 
     * @param  string    $packages 
     * @access public
     * @return array|bool
     */
    public function getVersionsByAPI($packages)
    {
        $packages = helper::safe64Encode($packages);
        $apiURL = $this->apiRoot . 'apiGetVersions-' . $packages . '.json';
        $data = $this->fetchAPI($apiURL);
        if(isset($data->versions)) return (array)$data->versions;
        return false;
    }

    /**
     * Check incompatible package
     * 
     * @param  array    $versions 
     * @access public
     * @return array
     */
    public function checkIncompatible($versions)
    {
        $apiURL = $this->apiRoot . 'apiCheckIncompatible-' . helper::safe64Encode(json_encode($versions)) . '.json';
        $data = $this->fetchAPI($apiURL);
        if(isset($data->incompatibleExts)) return (array)$data->incompatibleExts;
        return array();

    }

    /**
     * Download an package.
     * 
     * @param  string    $package 
     * @param  string    $downLink 
     * @access public
     * @return void
     */
    public function downloadPackage($package, $downLink)
    {
        $packageFile = $this->getPackageFile($package);
        $this->agent->fetch($downLink);
        file_put_contents($packageFile, $this->agent->results);
    }

    /**
     * Get packages by status.
     * 
     * @param  string    $status 
     * @access public
     * @return array
     */
    public function getLocalPackages($status)
    {
        $packages = $this->dao->select('*')->from(TABLE_PACKAGE)->where('status')->eq($status)->fetchAll('code');
        foreach($packages as $package)
        {
            if($package->site and stripos(strtolower($package->site), 'http') === false) $package->site = 'http://' . $package->site;
        }
        return $packages;
    }

    /**
     * Get package info from database.
     * 
     * @param  string    $package 
     * @access public
     * @return object
     */
    public function getInfoFromDB($package)
    {
        return $this->dao->select('*')->from(TABLE_PACKAGE)->where('code')->eq($package)->fetch();
    }

    /**
     * Get info of an package from the package file.
     * 
     * @param  string    $package 
     * @access public
     * @return object
     */
    public function getInfoFromPackage($package)
    {
        /* Init the data. */
        $data = new stdclass();
        $data->name             = $package;
        $data->code             = $package;
        $data->version          = 'unknown';
        $data->author           = 'unknown';
        $data->desc             = $package;
        $data->site             = 'unknown';
        $data->license          = 'unknown';
        $data->ranzhiCompatible = '';
        $data->type             = '';
        $data->depends          = '';

        $info = $this->parsePackageCFG($package);
        foreach($info as $key => $value) if(isset($data->$key)) $data->$key = $value;
        if(isset($info->ranzhiversion))        $data->ranzhiCompatible = $info->ranzhiversion;
        if(isset($info->ranzhi['compatible'])) $data->ranzhiCompatible = $info->ranzhi['compatible'];
        if(isset($info->depends))              $data->depends          = json_encode($info->depends);

        return $data;
    }

    /**
     * Parse package's config file.
     * 
     * @param  string    $package 
     * @access public
     * @return object
     */
    public function parsePackageCFG($package)
    {
        $info = new stdclass();

        /* First, try ini file. before 2.5 version. */
        $infoFile = "ext/$package/doc/copyright.txt";
        if(file_exists($infoFile)) return (object)parse_ini_file($infoFile);

        /**
         * Then try parse yaml file. since 2.5 version.  
         */

        /* Try the yaml of current lang, then try en. */
        $lang = $this->app->getClientLang();
        $infoFile = "ext/$package/doc/$lang.yaml";

        if(!file_exists($infoFile)) $infoFile = "ext/$package/doc/en.yaml";
        if(!file_exists($infoFile)) return $info;

        /* Load the yaml file and parse it into object. */
        $this->app->loadClass('spyc', true);
        $info = (object)spyc_load(file_get_contents($infoFile));

        if(isset($info->releases))
        {
            krsort($info->releases);
            $info->version = key($info->releases);
            foreach($info->releases[$info->version] as $key => $value) $info->$key = $value;
        }
        return $info;
    }

    /**
     * Get the full path of the zip file of a package. 
     * 
     * @param  string    $package 
     * @access public
     * @return string
     */
    public function getPackageFile($package)
    {
        return $this->app->getTmpRoot() . 'package/' . $package . '.zip';
    }

    /**
     * Get pathes from an package package.
     * 
     * @param  string    $package 
     * @access public
     * @return array
     */
    public function getPathesFromPackage($package)
    {
        $pathes = array();
        $packageFile = $this->getPackageFile($package);

        /* Get files from the package file. */
        $this->app->loadClass('pclzip', true);
        $zip   = new pclzip($packageFile);
        $files = $zip->listContent();
        if($files)
        {
            foreach($files as $file)
            {
                $file = (object)$file;
                if($file->folder) continue;
                $file->filename = substr($file->filename, strpos($file->filename, '/') + 1);
                $pathes[] = dirname($file->filename);
            }
        }

        /* Append the pathes to stored the extracted files. */
        $pathes[] = "app/sys/package/ext/";

        return array_unique($pathes);
    }

    /**
     * Get all files from a package.
     * 
     * @param  string    $package 
     * @access public
     * @return array
     */
    public function getFilesFromPackage($package)
    {
        $packageDir = "ext/$package/";
        $files = $this->classFile->readDir($packageDir, array('db', 'doc'));
        return $files;
    }

    /**
     * Get the package's condition. 
     * 
     * @param  string    $extenstion 
     * @access public
     * @return object
     */
    public function getCondition($package)
    {
        $info      = $this->parsePackageCFG($package);
        $condition = new stdclass();

        $condition->ranzhi    = array('compatible' => '', 'incompatible' => '');
        $condition->depends   = '';
        $condition->conflicts = '';

        if(isset($info->ranzhi))        $condition->ranzhi    = $info->ranzhi;
        if(isset($info->depends))       $condition->depends   = $info->depends;
        if(isset($info->conflicts))     $condition->conflicts = $info->conflicts;

        if(isset($info->ranzhiVersion)) $condition->ranzhi['compatible'] = $info->ranzhiVersion;
        if(isset($info->ranzhiversion)) $condition->ranzhi['compatible'] = $info->ranzhiversion;

        return $condition;
    }

    /**
     * Process license. If is opensource return the full text of it.
     * 
     * @param  string    $license 
     * @access public
     * @return string
     */
    public function processLicense($license)
    {
        if(strlen($license) > 10) return $license;    // more then 10 letters, not gpl, lgpl, apache, bsd or mit.

        $licenseFile = dirname(__FILE__) . '/license/' . strtolower($license) . '.txt';
        if(file_exists($licenseFile)) return file_get_contents($licenseFile);

        return $license;
    }

    /**
     * Get hook file for install or uninstall.
     * 
     * @param  string    $package 
     * @param  string    $hook      preinstall|postinstall|preuninstall|postuninstall 
     * @access public
     * @return string|bool
     */
    public function getHookFile($package, $hook)
    {
        $hookFile = "ext/$package/hook/$hook.php";
        if(file_exists($hookFile)) return $hookFile;
        return false;
    }

    /**
     * Get the install db file.
     * 
     * @param  string    $package 
     * @param  string    $method 
     * @access public
     * @return string
     */
    public function getDBFile($package, $method = 'install')
    {
        return "ext/$package/db/$method.sql";
    }

    /**
     * Check the download path.
     * 
     * @access public
     * @return object   the check result.
     */
    public function checkDownloadPath()
    {
        /* Init the return. */
        $return = new stdclass();
        $return->result = 'ok';
        $return->error  = '';

        $tmpRoot = $this->app->getTmpRoot();
        $downloadPath = $tmpRoot . 'package';

        if(!is_dir($downloadPath))
        {
            if(is_writable($tmpRoot))
            {
                mkdir($downloadPath);
            }
            else
            {
                $return->result = 'fail';
                $return->error  = sprintf($this->lang->package->errorDownloadPathNotFound, $downloadPath, $downloadPath);
            }
        }
        elseif(!is_writable($downloadPath))
        {
            $return->result = 'fail';
            $return->error  = sprintf($this->lang->package->errorDownloadPathNotWritable, $downloadPath, $downloadPath);
        }
        return $return;
    }

    /**
     * Check Conflicts.
     * 
     * @param  object    $condition 
     * @param  array     $installedExts 
     * @access public
     * @return viod
     */
    public function checkConflicts($condition, $installedExts)
    {
        /* Check conflicts. */
        $conflicts = $condition->conflicts;
        if($conflicts)
        {
            $conflictsExt = '';
            foreach($conflicts as $code => $limit)
            {
                if(isset($installedExts[$code]))
                {
                    if($this->package->compare4Limit($installedExts[$code]->version, $limit)) $conflictsExt .= $installedExts[$code]->name . " ";
                }
            }

            if($conflictsExt)
            {
                return array('result' => 'fail', 'error' => sprintf($this->lang->package->errorConflicts, $conflictsExt));
            }
        }
        return array('result' => 'success');
    }

    /**
     * check ExtRequired
     * 
     * @param  array    $depends 
     * @param  array    $installedExts 
     * @access public
     * @return array
     */
    public function checkExtRequired($depends, $installedExts)
    {
        if($depends)
        {
            $dependsExt = '';
            foreach($depends as $code => $limit)
            {
                $noDepends = false;
                if(isset($installedExts[$code]))
                {
                    if($this->package->compare4Limit($installedExts[$code]->version, $limit, 'noBetween'))$noDepends = true;
                }
                else
                {
                    $noDepends = true;
                }

                $extVersion = '';
                if($limit != 'all')
                {
                    $extVersion .= '(';
                    if(!empty($limit['min'])) $extVersion .= '>=v' . $limit['min'];
                    if(!empty($limit['max'])) $extVersion .= ' <=v' . $limit['max'];
                    $extVersion .=')';
                }
                if($noDepends)$dependsExt .= $code . $extVersion . ' ' . html::a(inlink('obtain', 'type=bycode&param=' . helper::safe64Encode($code)), $this->lang->package->installExt, '_blank') . '<br />';
            }

            if($noDepends)
            {
                return array('result' => 'fail', 'error' => sprintf($this->lang->package->errorDepends, $dependsExt));
            }
            return array('result' => 'success');
        }
        return array('result' => 'success');
    }

    /**
     * Check package files.
     * 
     * @param  string    $package 
     * @access public
     * @return object    the check result.
     */
    public function checkPackagePathes($package, $type = '')
    {
        $return = new stdclass();
        $return->result        = 'ok';
        $return->errors        = '';
        $return->mkdirCommands = '';
        $return->chmodCommands = '';
        $return->dirs2Created  = array();

        $basePath = $this->app->getBasePath();
        $pathes   = $this->getPathesFromPackage($package);
        foreach($pathes as $path)
        {
            if($path == 'db' or $path == 'doc' or $path == 'hook') continue;
            $path = $basePath . $path;
            if(is_dir($path))
            {
                if(!is_writable($path))
                {
                    $return->errors .= sprintf($this->lang->package->errorTargetPathNotWritable, $path) . '<br />';
                    $return->chmodCommands .= "sudo chmod -R 777 $path<br />";
                }
            }
            else
            {
                if(!@mkdir($path, 0755, true))
                {
                    $return->errors .= sprintf($this->lang->package->errorTargetPathNotExists, $path) . '<br />';
                    $return->mkdirCommands .= "mkdir -p $path<br />";
                    $return->chmodCommands .= "sudo chmod -R 777 $path<br />";
                }
                $return->dirs2Created[] = $path;
            }
        }

        if($return->errors) $return->result = 'fail';
        $return->mkdirCommands = empty($return->mkdirCommands) ? '' : '<code>' . str_replace('/', DIRECTORY_SEPARATOR, $return->mkdirCommands) . '</code>';
        $return->errors .= $this->lang->package->executeCommands . $return->mkdirCommands;
        if(PHP_OS == 'Linux') $return->errors .= empty($return->chmodCommands) ? '' : '<code>' . $return->chmodCommands . '</code>';
        return $return;
    }

    /**
     * Check the package's version is compatibility for ranzhi version
     * 
     * @param  string    $version 
     * @access public
     * @return bool
     */
    public function checkVersion($version)
    {
        if($version == 'all') return true;
        $version = explode(',', $version);
        if(in_array($this->config->version, $version)) return true;
        return false;
    }

    /**
     * Check files in the package conflicts with exists files or not.
     * 
     * @param  string    $package 
     * @param  string    $type
     * @param  bool      $isCheck
     * @access public
     * @return object
     */
    public function checkFile($package)
    {
        $return = new stdclass();
        $return->result = 'ok';
        $return->error  = '';

        $packageFiles = $this->getFilesFromPackage($package);
        $basePath = $this->app->getBasePath();
        foreach($packageFiles as $packageFile)
        {
            $compareFile = $basePath . str_replace(realpath("ext/$package") . '/', '', $packageFile);
            if(!file_exists($compareFile)) continue;
            if(md5_file($packageFile) != md5_file($compareFile)) $return->error .= $compareFile . '<br />';
        }

        if($return->error != '') $return->result = 'fail';
        return $return;
    }

    /**
     * Extract an package.
     * 
     * @param  string    $package 
     * @access public
     * @return object
     */
    public function extractPackage($package) 
    {
        $return = new stdclass();
        $return->result = 'ok';
        $return->error  = '';

        /* try remove old extracted files. */
        $packagePath = "ext/$package";
        if(is_dir($packagePath)) $this->classFile->removeDir($packagePath);

        /* Extract files. */
        $packageFile = $this->getPackageFile($package);
        $this->app->loadClass('pclzip', true);
        $zip = new pclzip($packageFile);
        $files = $zip->listContent();
        $removePath = $files[0]['filename'];
        if($zip->extract(PCLZIP_OPT_PATH, $packagePath, PCLZIP_OPT_REMOVE_PATH, $removePath) == 0)
        {
            $return->result = 'fail';
            $return->error  = $zip->errorInfo(true);
        }

        return $return;
    }

    /**
     * Copy package files. 
     * 
     * @param  int    $package 
     * @access public
     * @return array
     */
    public function copyPackageFiles($package, $type)
    {
        $basePath    = $this->app->getBasePath();
        $packageDir  = "ext/$package/";
        $pathes      = scandir($packageDir);
        $copiedFiles = array();

        foreach($pathes as $path)
        {
            if($path == 'db' or $path == 'doc' or $path == 'hook' or $path == '..' or $path == '.') continue;
            $copiedFiles = $this->classFile->copyDir($packageDir . $path, $basePath . $path);
        }

        foreach($copiedFiles as $key => $copiedFile)
        {
            $copiedFiles[$copiedFile] = md5_file($copiedFile);
            unset($copiedFiles[$key]);
        }
        return $copiedFiles;
    }

    /**
     * Remove an package.
     * 
     * @param  string    $package 
     * @access public
     * @return array     the remove commands need executed manually.
     */
    public function removePackage($package)
    {
        $package = $this->getInfoFromDB($package);
        if($package->type == 'patch') return true;
        $dirs  = json_decode($package->dirs);
        $files = json_decode($package->files);
        $basePath = $this->app->getBasePath();
        $wwwRoot  = $this->app->getWwwRoot();
        $removeCommands = array();

        /* Remove files first. */
        if($files)
        {
            foreach($files as $file => $savedMD5)
            {
                $appFile = $basePath . $file;
                $wwwFile = $wwwRoot . $file;
                if(file_exists($appFile)) $file = $appFile;
                if(file_exists($wwwFile)) $file = $wwwFile;

                if(!file_exists($file)) continue;

                if(md5_file($file) != $savedMD5)
                {
                    $removeCommands[] = PHP_OS == 'Linux' ? "rm -fr $file #changed" : "del $file :changed";
                }
                elseif(!@unlink($file))
                {
                    $removeCommands[] = PHP_OS == 'Linux' ? "rm -fr $file" : "del $file";
                }
            }
        }

        /* Then remove dirs. */
        if($dirs)
        {
            rsort($dirs);    // remove from the lower level directory.
            foreach($dirs as $dir)
            {
                if(!@rmdir($basePath . $dir)) $removeCommands[] = "rmdir $basePath$dir";
            }
        }

        /* Clean model cache files. */
        $this->cleanModelCache();

        return $removeCommands;
    }

    /**
     * Clean model cache files.
     * 
     * @access public
     * @return void
     */
    public function cleanModelCache()
    {
        $modelCacheFiles = glob($this->app->getTmpRoot() . 'model/*');
        foreach($modelCacheFiles as $cacheFile) @unlink($cacheFile);
    }

    /**
     * Erase an package's package file.
     * 
     * @param  string    $package 
     * @access public
     * @return array     the remove commands need executed manually.
     */
     public function erasePackage($package)
     {
         $removeCommands = array();

         $this->dao->delete()->from(TABLE_PACKAGE)->where('code')->eq($package)->exec();

         /* Remove the zip file. */
         $packageFile = $this->getPackageFile($package);
         if(!file_exists($packageFile)) return false;
         if(file_exists($packageFile) and !@unlink($packageFile))
         {
             $removeCommands[] = PHP_OS == 'Linux' ? "rm -fr $packageFile" : "del $packageFile";
         }

         /* Remove the extracted files. */
         $extractedDir = realpath("ext/$package");
         if($extractedDir != '/' and !$this->classFile->removeDir($extractedDir))
         {
             $removeCommands[] = PHP_OS == 'Linux' ? "rm -fr $extractedDir" : "rmdir $extractedDir /s";
         }

         return $removeCommands;
     }

     /**
      * Judge need execute db install or not.
      * 
      * @param  string    $package 
      * @param  string    $method 
      * @access public
      * @return bool
      */
     public function needExecuteDB($package, $method = 'install')
     {
         return file_exists($this->getDBFile($package, $method));
     }

     /**
      * Install the db.
      * 
      * @param  int    $package 
      * @access public
      * @return object
      */
     public function executeDB($package, $method = 'install')
     {
         $return = new stdclass();
         $return->result = 'ok';
         $return->error  = '';

         $dbFile = $this->getDBFile($package, $method);
         if(!file_exists($dbFile)) return $return;

         $sqls = file_get_contents($this->getDBFile($package, $method));
         $sqls = explode(';', $sqls);

         foreach($sqls as $sql)
         {
             $sql = trim($sql);
             if(empty($sql)) continue;

             try
             {
                 $this->dbh->query($sql);
             }
             catch (PDOException $e) 
             {
                 $return->error .= '<p>' . $e->getMessage() . "<br />THE SQL IS: $sql</p>";
             }
         }
         if($return->error) $return->result = 'fail';
         return $return;
     }

     /**
      * Backup db when uninstall package. 
      * 
      * @param  string    $package 
      * @access public
      * @return bool|string
      */
     public function backupDB($package)
     {
         $zdb = $this->app->loadClass('zdb');

         $sqls = file_get_contents($this->getDBFile($package, 'uninstall'));
         $sqls = explode(';', $sqls);

         /* Get tables for backup. */
         $backupTables = array();
         foreach($sqls as $sql)
         {
             $sql = preg_replace('/IF EXISTS /i', '', trim($sql));
             if(preg_match('/TABLE +`?([^` ]*)`?/i', $sql, $out))
             {
                 if(!empty($out[1])) $backupTables[$out[1]] = $out[1];
             }
         }

         /* Back up database. */
         if($backupTables)
         {
             $backupFile = $this->app->getTmpRoot() . $package . '.' . date('Ymd') . '.sql';
             $result     = $zdb->dump($backupFile, $backupTables);
             if($result->result) return $backupFile;
             return false; 
         }
         return false; 
     }

     /**
      * Save the package to database.
      * 
      * @param  string    $package     the package code
      * @param  string    $type          the package type
      * @access public
      * @return void
      */
     public function savePackage($package, $type)
     {
         $code      = $package;
         $package = $this->getInfoFromPackage($package);
         $package->status = 'available';
         $package->code   = $code;
         $package->type   = empty($type) ? $package->type : $type;

         $this->dao->replace(TABLE_PACKAGE)->data($package)->exec();
     }

     /**
      * Update an package.
      * 
      * @param  string    $package 
      * @param  string    $status 
      * @param  array     $files 
      * @access public
      * @return void
      */
     public function updatePackage($package, $data)
     {
         $data = (object)$data;
         $basePath = $this->app->getBasePath();
         $wwwRoot  = $this->app->getWwwRoot();

         if(isset($data->dirs))
         {
             if($data->dirs)
             {
                 foreach($data->dirs as $key => $dir)
                 {
                     $data->dirs[$key] = str_replace($basePath, '', $dir);
                 }
             }
             $data->dirs = json_encode($data->dirs);
         }

         if(isset($data->files))
         {
             foreach($data->files as $fullFilePath => $md5)
             {
                 if(strpos($fullFilePath, $basePath) !== false) $relativeFilePath = str_replace($basePath, '', $fullFilePath);
                 if(strpos($fullFilePath, $wwwRoot) !== false) $relativeFilePath = str_replace($wwwRoot, '', $fullFilePath);
                 
                 $data->files[$relativeFilePath] = $md5;
                 unset($data->files[$fullFilePath]);
             }
             $data->files = json_encode($data->files);
         }
         return $this->dao->update(TABLE_PACKAGE)->data($data)->where('code')->eq($package)->exec();
     }

     /**
      * Check depends package.
      * 
      * @param  string    $package 
      * @access public
      * @return array
      */
     public function checkDepends($package)
     {
         $result      = array();
         $packageInfo = $this->dao->select('*')->from(TABLE_PACKAGE)->where('code')->eq($package)->fetch();
         $dependsExts = $this->dao->select('*')->from(TABLE_PACKAGE)->where('depends')->like("%$package%")->andWhere('status')->ne('available')->fetchAll();
         if($dependsExts)
         {
             foreach($dependsExts as $dependsExt)
             {
                 $depends = json_decode($dependsExt->depends, true);
                 if($this->compare4Limit($packageInfo->version, $depends[$package])) $result[] = $dependsExt->name;
             }
         }
         return $result;
     }

     /**
      * Compare for limit data.
      * 
      * @param  string $version 
      * @param  array  $limit 
      * @param  string $type 
      * @access public
      * @return void
      */
     public function compare4Limit($version, $limit, $type = 'between')
     {
         $result = false;
         if(empty($limit)) return true;

         if($limit == 'all')
         {
             $result = true;
         }
         else
         {
             if(!empty($limit['min']) and $version >= $limit['min']) $result = true;
             if(!empty($limit['max']) and $version <= $limit['max']) $result = true;
             if(!empty($limit['max']) and $version > $limit['max'] and $result) $result = false;
         }

         if($type != 'between') return !$result;
         return $result;
     }
}
