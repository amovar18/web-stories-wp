<?php
/**
 * Class Experiments
 *
 * @link      https://github.com/googleforcreators/web-stories-wp
 *
 * @copyright 2020 Google LLC
 * @license   https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 */

/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace Google\Web_Stories;

use Google\Web_Stories\Infrastructure\HasRequirements;

/**
 * Experiments class.
 *
 * Allows turning flags on/off via the admin UI.
 *
 * @phpstan-type Experiment array{
 *   name: string,
 *   label: string,
 *   description: string,
 *   group: string,
 *   default?: bool
 * }
 */
class Experiments extends Service_Base implements HasRequirements {
	/**
	 * Settings page name.
	 */
	public const PAGE_NAME = 'web-stories-experiments';

	/**
	 * Settings instance.
	 *
	 * @var Settings Settings instance.
	 */
	private $settings;

	/**
	 * Experiments constructor.
	 *
	 * @since 1.12.0
	 *
	 * @param Settings $settings Settings instance.
	 * @return void
	 */
	public function __construct( Settings $settings ) {
		$this->settings = $settings;
	}

	/**
	 * Initializes experiments
	 */
	public function register(): void {
		if ( WEBSTORIES_DEV_MODE ) {
			add_action( 'admin_menu', [ $this, 'add_menu_page' ], 25 );
			add_action( 'admin_init', [ $this, 'initialize_settings' ] );
		}
	}

	/**
	 * Get the list of service IDs required for this service to be registered.
	 *
	 * Needed because settings needs to be registered first.
	 *
	 * @since 1.13.0
	 *
	 * @return string[] List of required services.
	 */
	public static function get_requirements(): array {
		return [ 'settings' ];
	}

	/**
	 * Registers the experiments admin menu page.
	 *
	 * @since 1.0.0
	 */
	public function add_menu_page(): void {
		add_submenu_page(
			'edit.php?post_type=' . Story_Post_Type::POST_TYPE_SLUG,
			__( 'Experiments', 'web-stories' ),
			__( 'Experiments', 'web-stories' ),
			'manage_options',
			'web-stories-experiments',
			[ $this, 'render' ],
			25
		);
	}

	/**
	 * Renders the experiments page.
	 *
	 * @codeCoverageIgnore
	 */
	public function render(): void {
		require_once WEBSTORIES_PLUGIN_DIR_PATH . 'includes/templates/admin/experiments.php';
	}

	/**
	 * Initializes the experiments settings page.
	 *
	 * @since 1.0.0
	 */
	public function initialize_settings(): void {
		add_settings_section(
			'web_stories_experiments_section',
			// The empty string ensures the render function won't output a h2.
			'',
			[ $this, 'display_experiment_section' ],
			self::PAGE_NAME
		);

		foreach ( $this->get_experiment_groups() as $group => $label ) {
			add_settings_section(
				$group,
				$label,
				'__return_empty_string',
				self::PAGE_NAME
			);
		}

		$experiments = $this->get_experiments();

		foreach ( $experiments as $experiment ) {
			add_settings_field(
				$experiment['name'],
				$experiment['label'],
				[ $this, 'display_experiment_field' ],
				self::PAGE_NAME,
				$experiment['group'],
				[
					'label'   => $experiment['description'],
					'id'      => $experiment['name'],
					'default' => \array_key_exists( 'default', $experiment ) && $experiment['default'],
				]
			);
		}
	}

	/**
	 * Display a checkbox field for a single experiment.
	 *
	 * @since 1.0.0
	 *
	 * @param array $args {
	 *     Array of arguments for displaying a single field.
	 *
	 *     @type string $id      Experiment ID.
	 *     @type string $label   Experiment label.
	 *     @type bool   $default Whether the experiment is enabled by default.
	 * }
	 *
	 * @phpstan-param array{id: string, label: string, default: bool} $args
	 */
	public function display_experiment_field( array $args ): void {
		$is_enabled_by_default = ! empty( $args['default'] );
		$checked               = $is_enabled_by_default || $this->is_experiment_enabled( $args['id'] );
		$disabled              = $is_enabled_by_default ? 'disabled' : '';
		?>
		<label for="<?php echo esc_attr( $args['id'] ); ?>">
			<input
				type="checkbox"
				name="<?php echo esc_attr( sprintf( '%1$s[%2$s]', $this->settings::SETTING_NAME_EXPERIMENTS, $args['id'] ) ); ?>"
				id="<?php echo esc_attr( $args['id'] ); ?>"
				value="1"
				<?php echo esc_attr( $disabled ); ?>
				<?php checked( $checked ); ?>
			/>
			<?php echo esc_html( $args['label'] ); ?>
		</label>
		<?php
	}

	/**
	 * Display the experiments section.
	 *
	 * @codeCoverageIgnore
	 */
	public function display_experiment_section(): void {
		?>
		<p>
			<?php
			esc_html_e( "The Web Stories editor includes experimental features that are useable while they're in development. Select the ones you'd like to enable. These features are likely to change, so avoid using them in production.", 'web-stories' );
			?>
		</p>
		<?php
	}

	/**
	 * Returns all available experiment groups.
	 *
	 * @since 1.0.0
	 *
	 * @return array<string,string> List of experiment groups
	 */
	public function get_experiment_groups(): array {
		return [
			'general'   => __( 'General', 'web-stories' ),
			'dashboard' => __( 'Dashboard', 'web-stories' ),
			'editor'    => __( 'Editor', 'web-stories' ),
		];
	}

	/**
	 * Returns a list of all experiments.
	 *
	 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
	 *
	 * @since 1.0.0
	 *
	 * @return array List of experiments by group.
	 *
	 * @phpstan-return Experiment[]
	 */
	public function get_experiments(): array {
		return [
			/**
			 * Author: @brittanyirl
			 * Issue: 2381
			 * Creation date: 2020-06-11
			 */
			[
				'name'        => 'enableInProgressTemplateActions',
				'label'       => __( 'Template actions', 'web-stories' ),
				'description' => __( 'Enable in-progress template actions', 'web-stories' ),
				'group'       => 'dashboard',
			],
			/**
			 * Author: @spacedmonkey
			 * Issue: #798
			 * Creation date: 2020-11-02
			 */
			[
				'name'        => 'enableSVG',
				'label'       => __( 'SVG upload', 'web-stories' ),
				'description' => __( 'Enable SVG upload', 'web-stories' ),
				'group'       => 'general',
			],
			/**
			 * Author: @spacedmonkey
			 * Issue: #10339
			 * Creation date: 2022-02-02
			 */
			[
				'name'        => 'enablePostLockingTakeOver',
				'label'       => __( 'Story locking take over', 'web-stories' ),
				'description' => __( 'Allow locked stories to be taken over by another author', 'web-stories' ),
				'group'       => 'editor',
			],
			/**
			 * Author: @barklund
			 * Issue: #9643
			 * Creation date: 2022-06-21
			 */
			[
				'name'        => 'extraPages',
				'label'       => __( 'Context Pages', 'web-stories' ),
				'description' => __( 'Show extra pages for context before and after the current canvas page. Note: This might come with a performance penalty.', 'web-stories' ),
				'group'       => 'editor',
				'default'     => true,
			],
			/**
			 * Author: @barklund
			 * Issue: #11908
			 * Creation date: 2022-07-19
			 */
			[
				'name'        => 'recordingTrimming',
				'label'       => __( 'Trim media recording', 'web-stories' ),
				'description' => __( 'Enable the ability to trim a media recording before you insert it', 'web-stories' ),
				'group'       => 'editor',
				'default'     => true,
			],
			/**
			 * Author: @swissspidy
			 * Issue: #11878
			 * Creation date: 2022-07-06
			 */
			[
				'name'        => 'tenorStickers',
				'label'       => __( 'Stickers', 'web-stories' ),
				'description' => __( 'Enable Tenor stickers support', 'web-stories' ),
				'group'       => 'editor',
				'default'     => true,
			],
			/**
			 * Author: @timarney
			 * Issue: #12094
			 * Creation date: 2022-08-11
			 */
			[
				'name'        => 'improvedAutosaves',
				'label'       => __( 'Improved Autosaves', 'web-stories' ),
				'description' => __( 'Enable improved autosaves support', 'web-stories' ),
				'group'       => 'editor',
				'default'     => true,
			],
			/**
			 * Author: @timarney
			 * Issue: #12093
			 * Creation date: 2022-08-18
			 */
			[
				'name'        => 'offScreenVideoCropping',
				'label'       => __( 'Crop off-screen video parts', 'web-stories' ),
				'description' => __( 'Enable support for cropping cut off-screen parts of videos', 'web-stories' ),
				'group'       => 'editor',
			],
			/**
			 * Author: @spacedmonkey
			 * Issue: #12211
			 * Creation date: 2022-09-07
			 */
			[
				'name'        => 'videoVolume',
				'label'       => __( 'Video Volume', 'web-stories' ),
				'description' => __( 'Enable setting video volume', 'web-stories' ),
				'group'       => 'editor',
			],
			/**
			 * Author: @barklund
			 * Issue: #12210
			 * Creation date: 2022-09-14
			 */
			[
				'name'        => 'customPageAdvance',
				'label'       => __( 'Per-Page Page Advance', 'web-stories' ),
				'description' => __( 'Enable detailed page advancement settings on a per-page basis', 'web-stories' ),
				'group'       => 'editor',
			],
		];
	}

	/**
	 * Returns the experiment statuses for a given group.
	 *
	 * @since 1.0.0
	 *
	 * @param string $group Experiments group name.
	 * @return array<string,bool> Experiment statuses with name as key and status as value.
	 */
	public function get_experiment_statuses( string $group ): array {
		/**
		 * List of experiments.
		 *
		 * @phpstan-var Experiment[]
		 */
		$experiments = wp_list_filter( $this->get_experiments(), [ 'group' => $group ] );

		if ( empty( $experiments ) ) {
			return [];
		}

		$result = [];

		foreach ( $experiments as $experiment ) {
			$result[ $experiment['name'] ] = $this->is_experiment_enabled( $experiment['name'] );
		}

		return $result;
	}

	/**
	 * Returns an experiment by name.
	 *
	 * @since 1.3.0
	 *
	 * @param string $name Experiment name.
	 * @return array|null Experiment if found, null otherwise.
	 *
	 * @phpstan-return Experiment|null
	 */
	protected function get_experiment( string $name ): ?array {
		$experiment = wp_list_filter( $this->get_experiments(), [ 'name' => $name ] );
		return ! empty( $experiment ) ? array_shift( $experiment ) : null;
	}

	/**
	 * Checks whether an experiment is enabled.
	 *
	 * @since 1.0.0
	 *
	 * @param string $name Experiment name.
	 * @return bool Whether the experiment is enabled.
	 */
	public function is_experiment_enabled( string $name ): bool {
		$experiment = $this->get_experiment( $name );

		if ( ! $experiment ) {
			return false;
		}

		if ( \array_key_exists( 'default', $experiment ) ) {
			return (bool) $experiment['default'];
		}

		/**
		 * List of enabled experiments.
		 *
		 * @var array<string, array> $experiments
		 * @phpstan-var Experiment[]
		 */
		$experiments = $this->settings->get_setting( $this->settings::SETTING_NAME_EXPERIMENTS, [] );
		return ! empty( $experiments[ $name ] );
	}

	/**
	 * Returns the names of all enabled experiments.
	 *
	 * @since 1.4.0
	 *
	 * @return string[] List of all enabled experiments.
	 */
	public function get_enabled_experiments(): array {
		$experiments = array_filter(
			wp_list_pluck( $this->get_experiments(), 'name' ),
			[ $this, 'is_experiment_enabled' ]
		);

		return $experiments;
	}
}
